```javascript
import { reddcoinWallet } from './lib/reddcoin.js';
import { comments, addComment, getComments } from './lib/storage.js';
import { userProfile, updateProfile, getProfile } from './lib/selfid.js';
import { sendTip } from './lib/gitcoin.js';

// Listen for messages from the popup script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'COMMENT_ADDED') {
    addComment(request.data);
    sendResponse({ status: 'Comment added successfully' });
  } else if (request.message === 'TIP_SENT') {
    sendTip(request.data);
    sendResponse({ status: 'Tip sent successfully' });
  } else if (request.message === 'PROFILE_UPDATED') {
    updateProfile(request.data);
    sendResponse({ status: 'Profile updated successfully' });
  }
});

// Inject the comment box and tip button into the webpage.
window.onload = () => {
  const commentBox = document.createElement('textarea');
  commentBox.id = 'commentBox';
  document.body.appendChild(commentBox);

  const tipButton = document.createElement('button');
  tipButton.id = 'tipButton';
  tipButton.innerText = 'Send Tip';
  document.body.appendChild(tipButton);

  // Add event listeners for the comment box and tip button.
  document.getElementById('commentBox').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      chrome.runtime.sendMessage({
        message: 'COMMENT_ADDED',
        data: { commentText: event.target.value, url: window.location.href }
      });
      event.target.value = '';
    }
  });

  document.getElementById('tipButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({
      message: 'TIP_SENT',
      data: { amount: 1, url: window.location.href }  // Tip amount is hardcoded for this example.
    });
  });
};

// Retrieve and display the user's profile and wallet balance.
getProfile().then(profile => {
  document.getElementById('userProfile').innerText = JSON.stringify(profile);
});

reddcoinWallet.getWalletBalance().then(balance => {
  document.getElementById('walletBalance').innerText = balance;
});

// Retrieve and display the comments for the current webpage.
getComments(window.location.href).then(comments => {
  comments.forEach(comment => {
    const commentElement = document.createElement('p');
    commentElement.innerText = `${comment.username}: ${comment.commentText}`;
    document.body.appendChild(commentElement);
  });
});
```