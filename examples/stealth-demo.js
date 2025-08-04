#!/usr/bin/env node

/**
 * Demonstration of stealth mode being enabled by default
 * 
 * This script shows how browserless now enables stealth mode by default
 * for both Puppeteer and Playwright browsers.
 */

import puppeteer from 'puppeteer-core';
import playwright from 'playwright-core';

const BROWSERLESS_URL = process.env.BROWSERLESS_URL || 'ws://localhost:3000';

async function demonstrateStealthMode() {
  console.log('🕵️ Browserless Stealth Mode Demonstration\n');
  
  console.log('🎯 Stealth mode is now ENABLED BY DEFAULT');
  console.log('   No explicit stealth parameter needed!\n');

  // Demo 1: Puppeteer with default stealth
  console.log('📋 Demo 1: Puppeteer (default stealth enabled)');
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSERLESS_URL,
    });
    console.log('   ✅ Connected to Puppeteer browser with default stealth');
    
    const page = await browser.newPage();
    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log(`   📱 User Agent: ${userAgent.substring(0, 50)}...`);
    
    await browser.disconnect();
    console.log('   ✅ Puppeteer test completed\n');
  } catch (error) {
    console.log(`   ⚠️ Puppeteer test failed (browserless may not be running): ${error.message}\n`);
  }

  // Demo 2: Playwright with default stealth
  console.log('📋 Demo 2: Playwright Chromium (default stealth enabled)');
  try {
    const browser = await playwright.chromium.connect(`${BROWSERLESS_URL}/chromium/playwright`);
    console.log('   ✅ Connected to Playwright browser with default stealth');
    
    const page = await browser.newPage();
    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log(`   📱 User Agent: ${userAgent.substring(0, 50)}...`);
    
    await browser.close();
    console.log('   ✅ Playwright test completed\n');
  } catch (error) {
    console.log(`   ⚠️ Playwright test failed (browserless may not be running): ${error.message}\n`);
  }

  // Demo 3: Explicitly disabling stealth
  console.log('📋 Demo 3: Puppeteer with stealth explicitly disabled');
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `${BROWSERLESS_URL}?launch=${encodeURIComponent('{"stealth":false}')}`,
    });
    console.log('   ✅ Connected to Puppeteer browser with stealth disabled');
    
    const page = await browser.newPage();
    const webdriver = await page.evaluate(() => navigator.webdriver);
    console.log(`   🤖 Webdriver detected: ${webdriver ? 'YES (stealth disabled)' : 'NO'}`);
    
    await browser.disconnect();
    console.log('   ✅ Stealth disabled test completed\n');
  } catch (error) {
    console.log(`   ⚠️ Stealth disabled test failed: ${error.message}\n`);
  }

  console.log('🎉 Summary:');
  console.log('   • Stealth mode is enabled by default');
  console.log('   • No configuration needed for basic stealth protection');
  console.log('   • Works with both Puppeteer and Playwright');
  console.log('   • Can be disabled with stealth:false if needed');
  console.log('   • Includes proper window sizing and anti-detection features');
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateStealthMode().catch(console.error);
}

export { demonstrateStealthMode };