import browser from 'webextension-polyfill';
import type BrowserType from 'webextension-polyfill';

type CreateCreatePropertiesType = BrowserType.Tabs.CreateCreatePropertiesType;

class Browser {
  static reload() {
    browser.runtime.reload();
  }

  static async openTab(options: CreateCreatePropertiesType) {
    await browser.tabs.create(options);
  }

  static async openExtensionInBrowser(route?: string, queryString?: string) {
    const extensionURL = Browser.getExtensionURL(route, queryString);
    this.openTab({
      url: extensionURL,
    });
  }

  static getExtensionURL(route?: string, queryString?: string): string {
    let extensionURL = browser.runtime.getURL(route as string);
    if (route) {
      extensionURL += `#${route}`;
    }

    if (queryString) {
      extensionURL += `?${queryString}`;
    }

    return extensionURL;
  }
}

export default Browser;
