const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>localStorage.setItem('cookie-accepted','true'));
 await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
 await page.locator('.it-school-bridge').click();await page.waitForURL('**/school');
 await page.locator('.direction-switch').getByRole('link',{name:/Программирование/}).click();await page.waitForURL('http://127.0.0.1:3000/');
 for(const [name,total,count] of [['Scratch',20160,16],['JavaScript',38016,32],['Go',38016,32]]){
  await page.locator('.it-price-options').getByRole('button',{name:new RegExp(name)}).click();
  assert.equal((await page.locator('.it-price-total').innerText()).replace(/\D/g,''),String(total));
  assert.match(await page.locator('.it-price-equation').innerText(),new RegExp('^'+count+' занятий'));
  await page.getByRole('link',{name:'Выбрать курс '+name,exact:true}).click();
  assert.equal(await page.locator('#selected-program').inputValue(),name);
  assert.match((await page.locator('.it-enroll-price').innerText()).replace(/\s/g,''),new RegExp(String(total)));
 }
 await page.getByLabel('Ваше имя',{exact:true}).fill('Проверка IT');
 await page.getByLabel('Телефон',{exact:true}).fill('9991234567');
 await page.getByText('Добавить email — необязательно',{exact:true}).click();await page.getByLabel('Электронная почта',{exact:true}).fill('qa@example.com');
 await page.locator('#lead-form-consent').check();
 let payload;await page.route('**/api/leads',async route=>{payload=route.request().postDataJSON();await route.fulfill({status:201,contentType:'application/json',body:'{"success":true}'});});
 await page.getByRole('button',{name:'Записаться на пробное занятие ↗',exact:true}).click();
 await page.getByRole('heading',{name:'Начало положено!',exact:true}).waitFor();
 assert.match(payload.program,/Go.*32.*45.*1188.*38016/);assert.equal(payload.tariff,'Стандарт');
 for(const width of [1920,1600,1440,1254,1024,768,650,390,320]){
  await page.setViewportSize({width,height:1000});await page.locator('#it-pricing').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
  const overflow=await page.locator('.it-pricing-grid,.it-price-options button,.it-price-detail,.it-school-bridge,.header-inner,.direction-switch').evaluateAll(nodes=>nodes.filter(el=>{const r=el.getBoundingClientRect();return r.left< -1||r.right>innerWidth+1||el.scrollWidth>el.clientWidth+2}).map(el=>el.className));assert.deepEqual(overflow,[],String(width));
  if([1440,390].includes(width)){await page.locator('#it-pricing').screenshot({path:'qa/it-pricing-'+width+'.png'});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);await page.screenshot({path:'qa/it-bridge-'+width+'.png'});}
 }
 assert.deepEqual(errors,[]);console.log('PASS: hero crosslink, three course totals, course selection, lead price payload (mock), widths 320–1920, no JS errors');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

