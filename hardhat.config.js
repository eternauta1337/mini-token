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
      // 0x2b2Ad0f250a29A02fAD5B6BeA74e5F495FE5CE82, 0xc975A99e90979FaE9dC9a27F3a7463a267C99515
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2]
    }
  }
};
