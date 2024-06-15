document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('toggleAutoScroll');
    const autopause = document.getElementById('toggleAutoPause');
  
    // Load the saved state from storage
    chrome.storage.sync.get(['autoScrollEnabled'], function (result) {
      console.log(result);
      checkbox.checked = result.autoScrollEnabled || false;
    });

    chrome.storage.sync.get(['autoPauseEnabled'], function (result) {
        console.log(result);
        autopause.checked = result.autoPauseEnabled || false;
      }
    );


  
    // Save the state when the checkbox is changed
    checkbox.addEventListener('change', function () {
      chrome.storage.sync.set({ autoScrollEnabled: checkbox.checked });
      chrome.runtime.sendMessage({ autoScrollEnabled: checkbox.checked });
    });

    autopause.addEventListener('change', function () {
        chrome.storage.sync.set({ autoPauseEnabled: autopause.checked });
        chrome.runtime.sendMessage({ autoPauseEnabled: autopause.checked });
      });
  });
  