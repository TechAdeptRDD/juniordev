```javascript
import { ReddcoinWallet } from './lib/reddcoin.js';
import { getComments, addComment } from './lib/storage.js';
import { getProfile, updateProfile } from './lib/selfid.js';
import { linkIdentity } from './lib/gitcoin.js';

let reddcoinWallet = new ReddcoinWallet();
let comments = {};
let userProfile = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'COMMENT_ADDED':
      addComment(request.comment);
      break;
    case 'TIP_SENT':
      reddcoinWallet.sendTip(request.address, request.amount);
      break;
    case 'PROFILE_UPDATED':
      updateProfile(request.profile);
      break;
    default:
      console.error(`Unrecognised message: ${request}`);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  reddcoinWallet.initialize();
  userProfile = getProfile();
  comments = getComments();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['popup.js']
  });
});
```