const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const p=await b.newPage({viewport:{width:1440,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('cookie-accepted','true');window.events=[];window.analyticsEvents=[];window.addEventListener('lumika:funnel',e=>window.events.push(e.detail));window.va=(...args)=>window.analyticsEvents.push(args);});
 await p.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
 await p.locator('.teacher-avatar img').scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('.teacher-avatar img')?.naturalWidth>0);
 assert.equal(await p.locator('.teacher-avatar img').evaluate(el=>el.complete && el.naturalWidth>0),true);
 const tabs=p.locator('.roadmap-tabs');
 for(const [name,range] of [['Scratch','11–16'],['JavaScript','21–32'],['Go','21–32']]){await tabs.getByRole('tab',{name:new RegExp(name)}).click();assert.match(await p.locator('#roadmap-panel').innerText(),new RegExp(range));}
 await tabs.getByRole('tab',{name:/Go/}).press('Home');assert.equal(await tabs.getByRole('tab',{name:/Scratch/}).getAttribute('aria-selected'),'true');
 await p.locator('.it-pricing-grid').scrollIntoViewIfNeeded();await p.waitForTimeout(400);await p.locator('#curriculum').scrollIntoViewIfNeeded();await p.locator('.it-pricing-grid').scrollIntoViewIfNeeded();await p.waitForTimeout(400);
 assert.equal(await p.evaluate(()=>events.filter(e=>e.event==='pricing_view').length),1);
 await p.getByRole('link',{name:'Выбрать курс Scratch',exact:true}).click();
 await p.getByLabel('Ваше имя',{exact:true}).fill('QA Private Name');await p.getByLabel('Телефон',{exact:true}).fill('9991234567');
 assert.equal(await p.locator('#lead-form-email').isVisible(),false);await p.locator('#lead-form-consent').check();
 assert.equal(await p.evaluate(()=>events.filter(e=>e.event==='lead_start').length),1);
 let attempt=0,payload;await p.route('**/api/leads',async r=>{payload=r.request().postDataJSON();attempt++;await r.fulfill({status:attempt===1?500:201,contentType:'application/json',body:attempt===1?'{"detail":"Тестовая ошибка"}':'{"ok":true}'});});
 const submit=p.getByRole('button',{name:'Записаться на пробное занятие ↗',exact:true});await submit.click();await p.getByRole('alert').filter({hasText:'Не удалось отправить заявку'}).waitFor();assert.equal(await p.evaluate(()=>events.filter(e=>e.event==='lead_success').length),0);await submit.click();await p.getByRole('heading',{name:'Начало положено!'}).waitFor();
 assert.equal(payload.social,null);assert.match(payload.program,/Scratch.*20160/);assert.equal(await p.evaluate(()=>events.filter(e=>e.event==='lead_success').length),1);
 const exported=await p.evaluate(()=>JSON.stringify(analyticsEvents));assert.ok(!exported.includes('QA Private Name'));assert.ok(!exported.includes('9991234567'));assert.match(exported,/lead_success/);
 await p.getByRole('button',{name:'Отправить ещё одну заявку'}).click();await p.getByLabel('Ваше имя',{exact:true}).fill('Test');await p.getByLabel('Телефон',{exact:true}).fill('9991234567');await p.locator('#lead-form-consent').check();await p.getByText('Добавить email — необязательно',{exact:true}).click();await p.getByLabel('Электронная почта',{exact:true}).fill('broken');await p.getByText('Добавить email — необязательно',{exact:true}).click();await submit.click();await p.locator('#lead-form-email[aria-invalid=true]').waitFor();assert.equal(await p.locator('#lead-form-email').isVisible(),true);
 for(const w of [1440,1024,768,390,320]){await p.setViewportSize({width:w,height:1000});await p.locator('#curriculum').scrollIntoViewIfNeeded();await p.waitForTimeout(500);const bad=await p.locator('.roadmap-grid,.roadmap-tabs,.roadmap-grid li,.trial-facts,.teacher-card,.enroll-form').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+1||r.left< -1||e.scrollWidth>e.clientWidth+2}).map(e=>e.className));assert.deepEqual(bad,[],String(w));if([1440,390].includes(w))await p.locator('#curriculum').screenshot({path:'qa/roadmap-'+w+'.png'});}
 await p.goto('http://127.0.0.1:3000/school',{waitUntil:'networkidle'});await p.locator('.school-pricing-grid').scrollIntoViewIfNeeded();await p.waitForTimeout(600);assert.equal(await p.evaluate(()=>events.filter(e=>e.event==='pricing_view').length),1);await p.locator('#school-enroll').scrollIntoViewIfNeeded();assert.match(await p.locator('#school-enroll').innerText(),/20–30 минут/);await p.getByLabel('Ваше имя',{exact:true}).fill('QA School');await p.getByLabel('Телефон',{exact:true}).fill('9991234567');await p.locator('#school-lead-form-consent').check();await p.getByRole('button',{name:'Обсудить обучение ↗',exact:true}).click();await p.getByRole('heading',{name:'Заявка отправлена',exact:true}).waitFor();assert.equal(await p.evaluate(()=>events.find(e=>e.event==='lead_success').direction),'school');assert.deepEqual(errors,[]);console.log('PASS roadmap + keyboard, photo, free intro, optional email + hidden validation, failed/successful mocked leads, funnel dedup/privacy/forwarding, school flow, responsive widths');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});



