export class LinkedInToolsPreferences {
  constructor() {}

  public setPreference(type: string, value: string) {
    chrome.storage.sync.set({ [type]: value });
  }

  public async getPreference(type: string) {
    const promise = new Promise<string>((resolve) => {
      chrome.storage.sync.get(type, function (data) {
        resolve(data[type] as string);
      });
    });

    return promise;
  }
}
