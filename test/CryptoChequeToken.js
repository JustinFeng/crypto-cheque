const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("CryptoChequeToken", function () {
  async function deployTokenFixture() {
    const CryptoChequeToken = await ethers.getContractFactory(
      "CryptoChequeToken"
    );
    const [owner, addr1, addr2] = await ethers.getSigners();

    const cryptoChequeToken = await CryptoChequeToken.deploy();
    await cryptoChequeToken.deployed();

    const initialOwnerBalance = await cryptoChequeToken.balanceOf(
      owner.address
    );

    return {
      CryptoChequeToken,
      cryptoChequeToken,
      initialOwnerBalance,
      owner,
      addr1,
      addr2,
    };
  }

  describe("Deployment", function () {
    it("Should set the right name", async function () {
      const { cryptoChequeToken } = await loadFixture(deployTokenFixture);

      expect(await cryptoChequeToken.name()).to.equal("CryptoChequeToken");
    });

    it("Should set the right symbol", async function () {
      const { cryptoChequeToken } = await loadFixture(deployTokenFixture);

      expect(await cryptoChequeToken.symbol()).to.equal("CCT");
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { cryptoChequeToken, owner } = await loadFixture(
        deployTokenFixture
      );
      const ownerBalance = await cryptoChequeToken.balanceOf(owner.address);
      expect(await cryptoChequeToken.totalSupply()).to.equal(ownerBalance);
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
      const { cryptoChequeToken, initialOwnerBalance, owner, addr1 } =
        await loadFixture(deployTokenFixture);

      await expect(
        cryptoChequeToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      expect(await cryptoChequeToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });

  describe("Deposit", function () {
    it("Should deposit cheque", async function () {
      const { cryptoChequeToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      const expireAt = Math.round(Date.now() / 1000) + 24 * 3600;
      const messageHash = ethers.utils.solidityKeccak256(
        ["address", "uint", "uint", "uint"],
        [owner.address, 1, 50, expireAt]
      );

      await expect(
        cryptoChequeToken
          .connect(addr1)
          .deposit(
            owner.address,
            1,
            50,
            expireAt,
            await owner.signMessage(ethers.utils.arrayify(messageHash))
          )
      ).to.changeTokenBalances(cryptoChequeToken, [owner, addr1], [-50, 50]);
    });

    it("Should fail if cheque is invalid", async function () {
      const { cryptoChequeToken, initialOwnerBalance, owner, addr1 } =
        await loadFixture(deployTokenFixture);
      const expireAt = Math.round(Date.now() / 1000) + 24 * 3600;

      await expect(
        cryptoChequeToken
          .connect(addr1)
          .deposit(
            addr1.address,
            1,
            50,
            expireAt,
            addr1.signMessage("invalid cheque")
          )
      ).to.be.revertedWith("CCT: invalid signature");

      expect(await cryptoChequeToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should fail if cheque is expired", async function () {
      const { cryptoChequeToken, initialOwnerBalance, owner, addr1 } =
        await loadFixture(deployTokenFixture);
      const expireAt = Math.round(Date.now() / 1000) - 24 * 3600;
      const messageHash = ethers.utils.solidityKeccak256(
        ["address", "uint", "uint", "uint"],
        [owner.address, 1, 50, expireAt]
      );

      await expect(
        cryptoChequeToken
          .connect(addr1)
          .deposit(
            owner.address,
            1,
            50,
            expireAt,
            await owner.signMessage(ethers.utils.arrayify(messageHash))
          )
      ).to.be.revertedWith("CCT: cheque expired");

      expect(await cryptoChequeToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should fail if drawer's balance is insufficient", async function () {
      const { cryptoChequeToken, initialOwnerBalance, owner, addr1 } =
        await loadFixture(deployTokenFixture);
      const expireAt = Math.round(Date.now() / 1000) + 24 * 3600;
      const messageHash = ethers.utils.solidityKeccak256(
        ["address", "uint", "uint", "uint"],
        [owner.address, 1, "100000000000000000001", expireAt]
      );

      await expect(
        cryptoChequeToken
          .connect(addr1)
          .deposit(
            owner.address,
            1,
            "100000000000000000001",
            expireAt,
            await owner.signMessage(ethers.utils.arrayify(messageHash))
          )
      ).to.be.revertedWith("CCT: insufficient balance");

      expect(await cryptoChequeToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should fail if the cheque has been used", async function () {
      const { cryptoChequeToken, owner, addr1 } =
        await loadFixture(deployTokenFixture);
      const expireAt = Math.round(Date.now() / 1000) + 24 * 3600;
      const messageHash = ethers.utils.solidityKeccak256(
        ["address", "uint", "uint", "uint"],
        [owner.address, 1, 50, expireAt]
      );
      const signature = await owner.signMessage(
        ethers.utils.arrayify(messageHash)
      );

      await cryptoChequeToken
        .connect(addr1)
        .deposit(owner.address, 1, 50, expireAt, signature);

      const currentOwnerBalance = await cryptoChequeToken.balanceOf(
        owner.address
      );

      await expect(
        cryptoChequeToken
          .connect(addr1)
          .deposit(owner.address, 1, 50, expireAt, signature)
      ).to.be.revertedWith("CCT: cheque used");

      expect(await cryptoChequeToken.balanceOf(owner.address)).to.equal(
        currentOwnerBalance
      );
    });
  });
});
