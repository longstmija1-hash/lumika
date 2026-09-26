const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup() {
  const subjects = fs.readFileSync(path.join(__dirname, '../src/data/subjectsData.js'), 'utf8').replace('export const', 'const');
  const source = fs.readFileSync(path.join(__dirname, '../src/lib/yandexMetrika.js'), 'utf8')
    .replace(/^import .*;\r?\n/m, '').replace(/export /g, '');
  const context = vm.createContext({ URL, Date, document: {title: 'ЛЮМИКА', referrer: 'https://search.example/results?email=private@example.com'}, window: {location: {origin: 'https://lumika.tech', pathname: '/'}} });
  vm.runInContext(subjects + '\n' + source + '\nglobalThis.api = {trackMetrikaPage, trackMetrikaGoal, metrikaPageUrl, metrikaReferrer};', context);
  return { ...context, calls: () => Array.from(context.window.ym.a || [], args => Array.from(args)) };
}

test('initial view, remount and SPA navigation produce one init and no duplicate views', () => {
  const {api, calls} = setup();
  api.trackMetrikaPage('/', '');
  api.trackMetrikaPage('/', '');
  api.trackMetrikaPage('/school', '');
  api.trackMetrikaPage('/school', 'step=2');
  api.trackMetrikaPage('/school', 'step=2');
  api.trackMetrikaPage('/', '');
  assert.equal(calls().filter(c => c[1] === 'init').length, 1);
  const hits = calls().filter(c => c[1] === 'hit');
  assert.equal(hits.length, 4);
  assert.equal(hits[0][3].referer, 'https://search.example/');
  assert.equal(hits[1][3].referer, 'https://lumika.tech/');
  assert.equal(hits[3][3].referer, 'https://lumika.tech/school');
});

test('all original options are retained with explicit SPA pageviews', () => {
  const {api, calls} = setup(); api.trackMetrikaPage('/', 'email=private@example.com');
  const [id, command, options] = calls()[0];
  assert.equal(id, 113078891); assert.equal(command, 'init');
  for (const key of ['ssr','webvisor','clickmap','accurateTrackBounce','trackLinks','defer']) assert.equal(options[key], true);
  assert.equal(options.ecommerce, 'dataLayer');
  assert.equal(options.url, 'https://lumika.tech/');
  assert.ok(!JSON.stringify(calls()).includes('private@example.com'));
});

test('URL sanitation excludes contact data, arbitrary paths, fragments and query values', () => {
  const {api} = setup();
  assert.equal(api.metrikaPageUrl('/person/private@example.com', 'https://lumika.tech'), 'https://lumika.tech/404');
  assert.equal(api.metrikaPageUrl('/subject/matematika-ege-oge-100', 'https://lumika.tech'), 'https://lumika.tech/subject/matematika-ege-oge-100');
  assert.equal(api.metrikaReferrer('https://lumika.tech/school?phone=79999999999#private', 'https://lumika.tech'), 'https://lumika.tech/school');
  assert.equal(api.metrikaReferrer('https://external.test/private@example.com?name=Name', 'https://lumika.tech'), 'https://external.test/');
  assert.equal(api.metrikaReferrer('javascript:alert(1)', 'https://lumika.tech'), '');
});

test('goals before script load queue after init without losing initial pageview', () => {
  const {api, window, calls} = setup();
  api.trackMetrikaGoal('lead_start', {course:'Scratch', direction:'it'});
  api.trackMetrikaPage('/', '');
  assert.deepEqual(calls().map(c => c[1]), ['init', 'reachGoal', 'hit']);
  assert.ok(Array.isArray(window.dataLayer));
  assert.ok(window.ym.l > 0);
});

test('blocked analytics cannot throw into page or form code', () => {
  const {api, window} = setup();
  window.ym = () => { throw Error('blocked'); };
  assert.doesNotThrow(() => api.trackMetrikaPage('/', ''));
  assert.doesNotThrow(() => api.trackMetrikaGoal('lead_success', {}));
});
