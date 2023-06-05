//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// import "hardhat/console.sol";

contract CryptoChequeToken is ERC20 {
  using ECDSA for bytes32;

  uint constant _initial_supply = 100 * (10 ** 18);

  mapping(address => uint[]) private _deposit_records;

  constructor() ERC20("CryptoChequeToken", "CCT") {
    _mint(msg.sender, _initial_supply);
  }

  function deposit(
    address drawer,
    uint chequeId,
    uint amount,
    uint expireAt,
    bytes memory signature
  ) external {
    address signer = keccak256(
      abi.encodePacked(drawer, chequeId, amount, expireAt)
    ).toEthSignedMessageHash().recover(signature);

    require(signer == drawer, "CCT: invalid signature");
    require(expireAt > block.timestamp, "CCT: cheque expired");
    require(balanceOf(drawer) >= amount, "CCT: insufficient balance");

    uint[] storage usedCheques = _deposit_records[signer];
    bool isUsed = false;
    for (uint i = 0; i < usedCheques.length; i++) {
      if (usedCheques[i] == chequeId) isUsed = true;
    }

    require(!isUsed, "CCT: cheque used");

    usedCheques.push(chequeId);
    _deposit_records[signer] = usedCheques;

    _transfer(drawer, msg.sender, amount);
  }

  fallback() external payable {}
  receive() external payable {}
}
