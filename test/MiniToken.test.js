const assert = require('assert/strict');
const { ethers } = require("hardhat");

describe("MiniToken", function () {
  let MiniToken;

  let deployer, anotherPerson;

  before('identify signers', async function () {
    [deployer, anotherPerson] = await ethers.getSigners();
  });

  before('deploy the contract', async function () {
    const factory = await ethers.getContractFactory("MiniToken");
    MiniToken = await factory.deploy();

    await MiniToken.deployed();
  });

  describe('before a transfer is made', function () {
    it('should show that the deployer address has 1000 tokens', async function () {
      assert.equal(
        (await MiniToken.balanceOf(deployer.address)).toString(),
        '1000'
      );
    });

    it('should show that another address has no tokens', async function () {
      assert.equal(
        (await MiniToken.balanceOf(anotherPerson.address)).toString(),
        '0'
      );
    });

    describe('when tokens are transfered', function () {
      before('transfer tokens', async function () {
        const tx = await MiniToken.transfer(anotherPerson.address, 500);
        await tx.wait();
      });

      it('should show that the deployer address has 500 tokens', async function () {
        assert.equal(
          (await MiniToken.balanceOf(deployer.address)).toString(),
          '500'
        );
      });

      it('should show that another address has 500 tokens', async function () {
        assert.equal(
          (await MiniToken.balanceOf(anotherPerson.address)).toString(),
          '500'
        );
      });
    });
  });
});
