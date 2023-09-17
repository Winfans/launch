import browser from 'webextension-polyfill';
import type Browser from 'webextension-polyfill';

type CreateCreatePropertiesType = Browser.Tabs.CreateCreatePropertiesType;

class BrowserExtension {
  private static instance: BrowserExtension;

  static getInstance() {
    if (!BrowserExtension.instance) {
      BrowserExtension.instance = new BrowserExtension();
    }
    return BrowserExtension.instance;
  }

  reload() {
    browser.runtime.reload();
  }

  async openTab(options: CreateCreatePropertiesType) {
    await browser.tabs.create(options);
  }

  async openExtensionInBrowser(route?: string, queryString?: string) {
    const extensionURL = this.getExtensionURL(route, queryString);
    this.openTab({
      url: extensionURL,
    });
  }

  getExtensionURL(route?: string, queryString?: string): string {
    let extensionURL = browser.runtime.getURL(route as string);
    if (route) {
      extensionURL += `#${route}`;
    }

    if (queryString) {
      extensionURL += `?${queryString}`;
    }

    return extensionURL;
  }

  // 待补充...
}

export default BrowserExtension;
