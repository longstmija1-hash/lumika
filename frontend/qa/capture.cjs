const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.addInitScript(()=>localStorage.setItem('cookie-accepted','true'));
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
await page.getByRole('tab',{name:'Scratch',exact:true}).focus();
await page.keyboard.press('ArrowRight');
if(await page.getByRole('tab',{name:'JavaScript',exact:true}).getAttribute('aria-selected')!=='true')throw Error('Keyboard tab failed');
await page.keyboard.press('Home');
await page.locator('h1').click();
await page.screenshot({path:'qa/desktop.png',fullPage:true});
await page.screenshot({path:'qa/desktop-hero.png'});
await page.setViewportSize({width:390,height:900});
await page.screenshot({path:'qa/mobile.png',fullPage:true});
await page.screenshot({path:'qa/mobile-hero.png'});
console.log('Production screenshots and keyboard navigation verified');
await browser.close();
})();
