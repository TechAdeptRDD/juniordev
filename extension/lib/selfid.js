```javascript
import { IDX } from '@ceramicstudio/idx';

let userProfile = {};

// Initialize IDX
const idx = new IDX({ provider: window.ethereum });

// Function to get user profile
async function getProfile(did) {
  userProfile = await idx.get('basicProfile', did);
  return userProfile;
}

// Function to set user profile
async function setProfile(profile) {
  await idx.set('basicProfile', profile);
  userProfile = profile;
}

// Function to link social media identities
async function linkSocialIdentities(did, socialIdentities) {
  await idx.set('socialAccounts', { did, accounts: socialIdentities });
}

export { getProfile, setProfile, linkSocialIdentities, userProfile };
```