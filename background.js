chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.onActivated.addListener(async info => {
      const tab = await chrome.tabs.get(info.tabId);
      
      const isMiro = tab.url.startsWith('https://miro.com/');
      isMiro 
        ? chrome.action.enable(tab.tabId) 
        : chrome.action.disable(tab.tabId);
    });
  });
