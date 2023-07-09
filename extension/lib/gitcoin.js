```javascript
// Importing required dependencies
const Web3 = require('web3');
const GitcoinPassportContract = require('gitcoin-passport-contract');

// Setting up web3 provider
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Gitcoin Passport Contract instance
const gitcoinPassport = new web3.eth.Contract(GitcoinPassportContract.abi, GitcoinPassportContract.address);

// Function to link social media identity
async function linkSocialIdentity(address, socialIdentity) {
    try {
        const tx = await gitcoinPassport.methods.linkIdentity(socialIdentity).send({ from: address });
        return tx;
    } catch (error) {
        console.error('Error while linking social identity:', error);
    }
}

// Function to get linked social identities
async function getLinkedIdentities(address) {
    try {
        const identities = await gitcoinPassport.methods.getIdentities(address).call();
        return identities;
    } catch (error) {
        console.error('Error while fetching linked identities:', error);
    }
}

module.exports = {
    linkSocialIdentity,
    getLinkedIdentities
};
```