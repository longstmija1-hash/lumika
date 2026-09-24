const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 await page.addInitScript(() => localStorage.setItem('cookie-accepted','true'));
 const errors=[]; page.on('pageerror',e=>errors.push(e.stack));
 await page.goto(process.env.QA_BASE_URL || 'http://127.0.0.1:3000',{waitUntil:'networkidle'});
 await page.getByRole('tab',{name:'JavaScript',exact:true}).click();
 await page.locator('#hero-project').getByRole('button',{name:'Изменить тему'}).click();
 assert.equal(await page.locator('#hero-project .changed').count(),1);
 await page.getByRole('tab',{name:'Go',exact:true}).click();
 await page.locator('#hero-project').getByRole('button',{name:'Запустить запрос'}).click();
 assert.match(await page.locator('#hero-project .terminal-response').innerText(),/200 OK/);
 await page.getByRole('tab',{name:'Scratch',exact:true}).click();
 await page.locator('#hero-project').getByRole('button',{name:'Запустить демо игры'}).click();
 assert.equal(await page.locator('#hero-project .playing').count(),1);
 const finder=page.locator('#finder');
 for (const [age,exp,interest,want] of [
 ['7–9','Никогда не программировал','Игры','Scratch'],
 ['10–12','Немного пробовал','Сайты','Scratch'],
 ['13–15','Никогда не программировал','Сайты','JavaScript'],
 ['16+','Уже писал код','Приложения','Go'],
 ['13–15','Уже писал код','Настоящее программирование','Go'],
 ['16+','Немного пробовал','Приложения','JavaScript']]) {
  for(const answer of [age,exp,interest]) await finder.getByRole('button',{name:answer,exact:true}).click();
  assert.equal(await finder.locator('h3').innerText(),want);
 }
 await finder.getByRole('link',{name:'Обсудить программу'}).click();
 assert.equal(await page.locator('#selected-program').inputValue(),'JavaScript');
 await page.getByRole('link',{name:'Попробовать Go',exact:true}).click();
 assert.equal(await page.locator('#selected-program').inputValue(),'Go');
 await page.getByRole('button',{name:'Записаться на пробное занятие'}).click();
 assert.equal(await page.locator('[aria-invalid=true]').count(),3);
 await page.getByLabel('Ваше имя',{exact:true}).fill('Тест интерфейса');
 await page.getByLabel('Телефон',{exact:true}).fill('9991234567');
 await page.getByText('Добавить email — необязательно',{exact:true}).click();await page.getByLabel('Электронная почта',{exact:true}).fill('qa@example.com');
 await page.locator('#lead-form-consent').check();
 let payload;
 await page.route('**/api/leads',async route=>{payload=route.request().postDataJSON();await route.fulfill({status:502,contentType:'application/json',body:JSON.stringify({detail:'Test error'})});});
 await page.getByRole('button',{name:'Записаться на пробное занятие'}).click();
 await page.locator('#lead-form [role=alert]').waitFor();
 assert.match(await page.locator('#lead-form [role=alert]').innerText(),/Не удалось/);
 await page.unroute('**/api/leads');
 await page.route('**/api/leads',async route=>{payload=route.request().postDataJSON();await route.fulfill({status:201,contentType:'application/json',body:'{"ok":true}'});});
 await page.getByRole('button',{name:'Записаться на пробное занятие'}).click();
 await page.getByText('Начало положено!').waitFor();
 assert.match(payload.program,/Go.*32.*38016/);
 assert.equal(payload.social,'qa@example.com');
 await page.getByRole('button',{name:'Отправить ещё одну заявку'}).click();
 const faq=page.locator('#faq details').first();await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),'');
 for(const width of [1920,1600,1440,1280,1024,980,768,601,600,390,375,320]) {
  await page.setViewportSize({width,height:900});
  await page.evaluate(()=>scrollTo(0,0));
  await page.waitForTimeout(300);
  const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  assert.ok(dims.scroll<=dims.width,JSON.stringify(dims));
  console.log('WIDTH',width,'OK');
  if(width===1440 || width===390) await page.screenshot({path:`qa/view-${width}.png`,fullPage:true});
 }
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Открыть меню'}).click();
 assert.equal(await page.locator('#main-navigation').isVisible(),true);
 await page.locator('#main-navigation').getByRole('link',{name:'Направления'}).click();
 assert.equal(await page.locator('#main-navigation').isVisible(),false);
 await page.getByRole('button',{name:'Открыть меню'}).click();await page.keyboard.press('Escape');
 assert.equal(await page.locator('#main-navigation').isVisible(),false);
 console.log('PASS: demos, recommendation branches, course transfer, form validation, failure/retry/success, FAQ, responsive widths, mobile menu.');
 console.log('BROWSER ERRORS',errors); assert.deepEqual(errors,[]);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});




