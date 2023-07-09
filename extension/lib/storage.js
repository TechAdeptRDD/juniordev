```javascript
// Importing Chrome Storage API
const storage = chrome.storage.local;

// Function to store comments
function storeComment(url, comment) {
  storage.get({comments: {}}, function(result) {
    if (!result.comments[url]) {
      result.comments[url] = [];
    }
    result.comments[url].push(comment);
    storage.set({comments: result.comments});
  });
}

// Function to retrieve comments
function getComments(url, callback) {
  storage.get({comments: {}}, function(result) {
    callback(result.comments[url] || []);
  });
}

// Function to store user profile
function storeProfile(profile) {
  storage.set({userProfile: profile});
}

// Function to retrieve user profile
function getProfile(callback) {
  storage.get({userProfile: {}}, function(result) {
    callback(result.userProfile);
  });
}

// Function to store ReddCoin wallet
function storeWallet(wallet) {
  storage.set({reddcoinWallet: wallet});
}

// Function to retrieve ReddCoin wallet
function getWallet(callback) {
  storage.get({reddcoinWallet: {}}, function(result) {
    callback(result.reddcoinWallet);
  });
}

// Exporting the functions
export { storeComment, getComments, storeProfile, getProfile, storeWallet, getWallet };
```