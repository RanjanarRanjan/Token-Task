const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(owner.address);
    await myToken.waitForDeployment();
  });

  it("Should deploy with correct initial supply", async function () {
    const decimals = await myToken.decimals();
    const expectedSupply = ethers.parseUnits("1000", decimals);
    const balance = await myToken.balanceOf(owner.address);
    expect(balance).to.equal(expectedSupply);
  });

  it("Owner should be able to mint tokens", async function () {
    await myToken.mint(owner.address, 100);
    const balance = await myToken.balanceOf(owner.address);
    expect(balance).to.be.above(0);
  });

  it("Non-owner cannot mint tokens", async function () {
    await expect(myToken.connect(addr1).mint(addr1.address, 100))
      .to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount");
  });

  it("Should allow burning tokens", async function () {
    const balanceBefore = await myToken.balanceOf(owner.address);
    await myToken.burn(100);
    const balanceAfter = await myToken.balanceOf(owner.address);
    expect(balanceAfter).to.equal(balanceBefore - 100n);
  });

  it("Should redeem tokens and emit Redeemed event", async function () {
    const amount = 100;
    const reward = "Coffee";

    await expect(myToken.redeem(amount, reward))
      .to.emit(myToken, "Redeemed")
      .withArgs(owner.address, amount, reward);
  });
});
