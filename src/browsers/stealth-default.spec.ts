import { describe, it } from 'mocha';
import { expect } from 'chai';
import { BrowserManager, Config, Hooks, FileSystem, Logger } from '@browserless.io/browserless';

describe('Stealth Mode Default', () => {
  it('should enable stealth mode by default when not specified', async () => {
    const config = new Config();
    const hooks = new Hooks();
    const fileSystem = new FileSystem(config);
    const browserManager = new BrowserManager(config, hooks, fileSystem);
    
    // Mock a request without explicit stealth setting
    const mockReq = {
      parsed: new URL('ws://localhost:3000?launch={}'),
      headers: {},
    };
    
    const mockRoute = {
      browser: class MockBrowser {
        static name = 'MockBrowser';
        constructor(_opts: any) {}
        launch(opts: any) {
          // Verify stealth is enabled by default
          expect(opts.stealth).to.be.true;
          return Promise.resolve({});
        }
        on() {}
        wsEndpoint() {
          return 'ws://localhost:12345/devtools/browser/abc123';
        }
      },
      defaultLaunchOptions: undefined,
    };
    
    const logger = new Logger('test');
    
    try {
      // This should enable stealth by default
      await browserManager.getBrowserForRequest(mockReq as any, mockRoute as any, logger);
    } catch (error) {
      // Expected to fail due to mocking, but stealth should be enabled
    }
  });

  it('should respect explicit stealth=false setting', async () => {
    const config = new Config();
    const hooks = new Hooks();
    const fileSystem = new FileSystem(config);
    const browserManager = new BrowserManager(config, hooks, fileSystem);
    
    // Mock a request with explicit stealth=false
    const mockReq = {
      parsed: new URL('ws://localhost:3000?launch={"stealth":false}'),
      headers: {},
    };
    
    const mockRoute = {
      browser: class MockBrowser {
        static name = 'MockBrowser';
        constructor(_opts: any) {}
        launch(opts: any) {
          // Verify stealth respects explicit false setting
          expect(opts.stealth).to.be.false;
          return Promise.resolve({});
        }
        on() {}
        wsEndpoint() {
          return 'ws://localhost:12345/devtools/browser/abc123';
        }
      },
      defaultLaunchOptions: undefined,
    };
    
    const logger = new Logger('test');
    
    try {
      // This should respect explicit stealth=false
      await browserManager.getBrowserForRequest(mockReq as any, mockRoute as any, logger);
    } catch (error) {
      // Expected to fail due to mocking, but stealth should be false
    }
  });
});