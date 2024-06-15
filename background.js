chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ autoScrollEnabled: false , autoPauseEnabled: false});
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.autoScrollEnabled !== undefined) {
    chrome.storage.sync.set({ autoScrollEnabled: message.autoScrollEnabled });
  }
  if (message.autoPauseEnabled !== undefined) {
    chrome.storage.sync.set({ autoPauseEnabled: message.autoPauseEnabled });
  }
});
