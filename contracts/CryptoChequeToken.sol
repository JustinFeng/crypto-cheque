//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract CryptoChequeToken is ERC20 {
  uint constant _initial_supply = 100 * (10 ** 18);

  constructor() ERC20("CryptoChequeToken", "CCT") {
    _mint(msg.sender, _initial_supply);
  }
}
