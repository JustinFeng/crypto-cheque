//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// import "hardhat/console.sol";

contract CryptoChequeToken is ERC20 {
  using ECDSA for bytes32;

  uint constant _initial_supply = 100 * (10 ** 18);

  constructor() ERC20("CryptoChequeToken", "CCT") {
    _mint(msg.sender, _initial_supply);
  }

  function deposit(
    address drawer,
    uint amount,
    uint expireAt,
    bytes memory signature
  ) external {
    address signer = keccak256(abi.encodePacked(drawer, amount, expireAt))
      .toEthSignedMessageHash()
      .recover(signature);

    require(signer == drawer, "CCT: invalid signature");

    _transfer(drawer, msg.sender, amount);
  }
}
