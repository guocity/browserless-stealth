# Stealth Mode

Browserless now enables stealth mode by default to reduce webdriver detection and make browser automation feel more like a normal browser.

## What's Enabled

When stealth mode is active (which is the default), the following features are enabled:

### For Chrome/Chromium browsers (CDP):
- Uses `puppeteer-extra-plugin-stealth` for comprehensive anti-detection
- Sets normal browser window size (1920x1080)
- Disables automation-related features
- Removes common bot detection signatures
- Optimizes various browser settings for stealth

### For Playwright browsers:
- **Chromium-based browsers**: Same stealth arguments as CDP browsers
- **Firefox**: Basic window size configuration
- **WebKit**: Minimal stealth configuration

## Configuration

### Default Behavior
Stealth mode is **enabled by default**. No configuration needed.

### Disabling Stealth Mode
To explicitly disable stealth mode, set `stealth: false` in your launch options:

**Puppeteer:**
```javascript
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000?launch={"stealth":false}',
});
```

**Playwright:**
```javascript
const browser = await playwright.chromium.connect(
  'ws://localhost:3000/chromium/playwright?launch={"stealth":false}'
);
```

**REST API:**
```bash
curl -X POST http://localhost:3000/content \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "launch": {"stealth": false}}'
```

### Enabling Stealth Mode (explicit)
While stealth is enabled by default, you can explicitly enable it:

```javascript
// Puppeteer
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000?launch={"stealth":true}',
});

// Playwright
const browser = await playwright.chromium.connect(
  'ws://localhost:3000/chromium/playwright?launch={"stealth":true}'
);
```

## Benefits

- **Reduced Detection**: Bypasses common webdriver detection methods
- **Normal Fingerprinting**: Browser appears more like a regular user browser
- **Proper Window Size**: Uses standard desktop resolution (1920x1080)
- **Better Automation**: Helps avoid CAPTCHAs and anti-bot measures
- **Universal Support**: Works with both Puppeteer and Playwright

## Migration

If you were previously using stealth mode explicitly:
- **No changes needed** - stealth is now default
- If you want to disable stealth, explicitly set `stealth: false`
- All existing stealth configurations continue to work

## Implementation Details

The stealth implementation includes:
- `--window-size=1920,1080` for normal desktop resolution
- `--disable-blink-features=AutomationControlled` to hide automation
- Various flags to reduce detection signatures
- Puppeteer Extra Stealth plugin for CDP browsers
- Browser-specific optimizations for each engine type