let autoScrollInterval;

function autoScroll() {
    const video = document.querySelector('video.video-stream.html5-main-video[src]');
    // console.log('Auto-scrolling...',video);
    if (video) {
      video.removeAttribute('loop');
      video.addEventListener('ended', scrollToNextShort);
    }
}

function scrollToNextShort() {
    const nextButton = document.querySelector('#navigation-button-down button');
    if (nextButton) {
      nextButton.click();
    }
}

// Start auto-scrolling if enabled
chrome.storage.sync.get(['autoScrollEnabled','autoPauseEnabled'], function (result) {
  if (result.autoScrollEnabled) {
    startAutoScroll();
  }
  if (result.autoPauseEnabled) {
    togglePauseVideo(result.autoPauseEnabled);
  }
});

// Function to start auto-scrolling
function startAutoScroll() {
  autoScrollInterval = setInterval(autoScroll, 5000); // Adjust the interval as needed
}

// Function to stop auto-scrolling
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}



function togglePauseVideo(enable) {
    if (enable) {
        window.addEventListener('blur', pauseVideo);
        window.addEventListener('focus', resumeVideo);
    } else {
        window.removeEventListener('blur', pauseVideo);
        window.removeEventListener('focus', resumeVideo);
    }
}

function pauseVideo() {
    const video = document.querySelector('video.html5-main-video');
    if (video) {
        video.pause();
    }
}

function resumeVideo() {
    const video = document.querySelector('video.html5-main-video');
    if (video) {
        video.play();
    }
}


window.addEventListener('yt-navigate-start', function () {
    // console.log('yt-navigate-start');
    chrome.storage.sync.get(['autoScrollEnabled','autoPauseEnabled'], function (result) {
      // console.log('yt-navigate-start',result);
        if (result.autoScrollEnabled) {
            startAutoScroll();
        }
        if (result.autoPauseEnabled) {
            togglePauseVideo(result.autoPauseEnabled);
        }
    });
});





// Listen for changes to the state
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.autoScrollEnabled) {
    if (changes.autoScrollEnabled.newValue) {
      startAutoScroll();
    } else {
        // console.log('stopAutoScroll');
      stopAutoScroll();
    }
  }

    if (changes.autoPauseEnabled) {
        // console.log('autoPauseEnabled');
        togglePauseVideo(changes.autoPauseEnabled.newValue);
    }
  
});




