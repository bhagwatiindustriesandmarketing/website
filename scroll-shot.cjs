const { chromium } = require('./node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/tanma/AppData/Local/ms-playwright/chromium-1223/chrome-win/chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Stats section
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight, behavior: 'instant' }));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'screenshot-stats.png' });

  // Categories
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.9, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-categories.png' });

  // Testimonials  
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.62, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-testimonials.png' });

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e.message); process.exit(1); });
