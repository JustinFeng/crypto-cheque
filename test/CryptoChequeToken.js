const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("CryptoChequeToken", function () {
  async function deployTokenFixture() {
    const CryptoChequeToken = await ethers.getContractFactory("CryptoChequeToken");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const cryptoChequeToken = await CryptoChequeToken.deploy();

    await cryptoChequeToken.deployed();

    return { CryptoChequeToken, cryptoChequeToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right name", async function () {
      const { cryptoChequeToken } = await loadFixture(deployTokenFixture);

      expect(await cryptoChequeToken.name()).to.equal('CryptoChequeToken');
    });

    it("Should set the right symbol", async function () {
      const { cryptoChequeToken } = await loadFixture(deployTokenFixture);

      expect(await cryptoChequeToken.symbol()).to.equal('CCT');
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { cryptoChequeToken, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await cryptoChequeToken.balanceOf(owner.address);
      expect(await cryptoChequeToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the right owner", async function() {
      const { cryptoChequeToken, owner } = await loadFixture(deployTokenFixture);

      expect(await cryptoChequeToken.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { cryptoChequeToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      await expect(
        cryptoChequeToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(cryptoChequeToken, [owner, addr1], [-50, 50]);

      await expect(
        cryptoChequeToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(cryptoChequeToken, [addr1, addr2], [-50, 50]);
    });

    it("Should emit Transfer events", async function () {
      const { cryptoChequeToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      await expect(cryptoChequeToken.transfer(addr1.address, 50))
        .to.emit(cryptoChequeToken, "Transfer")
        .withArgs(owner.address, addr1.address, 50);

      await expect(cryptoChequeToken.connect(addr1).transfer(addr2.address, 50))
        .to.emit(cryptoChequeToken, "Transfer")
        .withArgs(addr1.address, addr2.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { cryptoChequeToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      const initialOwnerBalance = await cryptoChequeToken.balanceOf(owner.address);

      await expect(
        cryptoChequeToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      expect(await cryptoChequeToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});