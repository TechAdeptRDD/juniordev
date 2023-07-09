```javascript
// Importing necessary libraries
const ElectrumClient = require('electrum-client');

// Reddcoin Wallet Class
class ReddcoinWallet {
  constructor() {
    this.client = new ElectrumClient('50001', 'localhost', 'tcp');
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Successfully connected to the Reddcoin Electrum server');
    } catch (error) {
      console.error('Failed to connect to the Reddcoin Electrum server', error);
    }
  }

  async getBalance(address) {
    try {
      const balance = await this.client.blockchainAddress_getBalance(address);
      return balance.confirmed;
    } catch (error) {
      console.error('Failed to get balance', error);
    }
  }

  async sendTip(address, amount) {
    try {
      const tx = await this.client.blockchainTransaction_broadcast(address, amount);
      return tx;
    } catch (error) {
      console.error('Failed to send tip', error);
    }
  }
}

// Exporting the ReddcoinWallet instance
const reddcoinWallet = new ReddcoinWallet();
module.exports = reddcoinWallet;
```