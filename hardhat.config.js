require('dotenv').config();

require('@nomiclabs/hardhat-ethers');

task('accounts', 'Prints the list of accounts and their balances', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const balanceWei = await ethers.provider.getBalance(account.address);
    const balanceEther = ethers.utils.formatEther(balanceWei);
    console.log(`${account.address}: ${balanceEther} ETH`);
  }
});

module.exports = {
  solidity: '0.8.4',
  networks: {
    local: {
      url: 'http://localhost:8545'
    },
    kovan: {
      url: `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2]
    }
  }
};
