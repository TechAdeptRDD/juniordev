```javascript
import { reddcoinWallet } from './lib/reddcoin.js';
import { comments, addComment, getComments } from './lib/storage.js';
import { userProfile, updateProfile, getProfile } from './lib/selfid.js';
import { sendTip } from './lib/gitcoin.js';

document.addEventListener('DOMContentLoaded', function() {
  const commentBox = document.getElementById('commentBox');
  const tipButton = document.getElementById('tipButton');
  const commentSubmit = document.getElementById('commentSubmit');
  const userProfileDisplay = document.getElementById('userProfile');
  const walletBalanceDisplay = document.getElementById('walletBalance');

  // Display user profile and wallet balance
  userProfileDisplay.textContent = getProfile(userProfile);
  walletBalanceDisplay.textContent = reddcoinWallet.getWalletBalance();

  // Add comment
  commentSubmit.addEventListener('click', function() {
    const commentText = commentBox.value;
    const url = window.location.href;
    addComment(userProfile.username, commentText, url);
    chrome.runtime.sendMessage({ type: 'COMMENT_ADDED', payload: { commentText, url } });
  });

  // Send tip
  tipButton.addEventListener('click', function() {
    const tipAmount = prompt("Enter the amount you want to tip:");
    sendTip(reddcoinWallet, tipAmount);
    chrome.runtime.sendMessage({ type: 'TIP_SENT', payload: { tipAmount } });
  });

  // Update profile
  userProfileDisplay.addEventListener('click', function() {
    const newProfile = prompt("Enter your new profile:");
    updateProfile(userProfile, newProfile);
    chrome.runtime.sendMessage({ type: 'PROFILE_UPDATED', payload: { newProfile } });
  });
});
```