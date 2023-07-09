```javascript
import { getProfile, updateProfile } from './lib/selfid.js';

document.addEventListener('DOMContentLoaded', function() {
  let userProfile = document.getElementById('userProfile');
  let updateButton = document.getElementById('updateButton');

  // Load the user's profile when the options page is opened
  getProfile().then(profile => {
    userProfile.value = JSON.stringify(profile, null, 2);
  });

  // Update the user's profile when the update button is clicked
  updateButton.addEventListener('click', function() {
    let newProfile = JSON.parse(userProfile.value);
    updateProfile(newProfile).then(() => {
      alert('Profile updated successfully!');
    }).catch(err => {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. See console for details.');
    });
  });
});
```