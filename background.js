'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.includes('messenger.com') || tab.url.includes('facebook.com')) {
        chrome.tabs.executeScript(tabId, {
            file: 'injected-title-suppressor.js'
        });
    }
});
