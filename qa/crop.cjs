const { chromium } = require('D:/웹 수익 자동화/rebuild-202610/_qa-tools/node_modules/playwright');
const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:path.join(process.env.LOCALAPPDATA,'ms-playwright','chromium-1243','chrome-win64','chrome.exe')});
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await c.newPage();
const [url,sel,out]=process.argv.slice(2);
await p.goto(url,{waitUntil:'networkidle'});
const el=p.locator(sel).first(); await el.scrollIntoViewIfNeeded();
const info=await el.evaluate(t=>({tw:t.scrollWidth,cw:t.clientWidth,ph:t.parentElement.className}));console.log(JSON.stringify(info));
await p.screenshot({path:out});await b.close();})();
