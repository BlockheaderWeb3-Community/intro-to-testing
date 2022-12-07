// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ColabBank {
    // The keyword "public" makes variables
    // accessible from other contracts
    uint256 public unlockTime;
    mapping(address => uint256) public balances;
    uint256 public totalColabBalance;

    address payable public owner;
    // Events allow clients to react to specific
    // contract changes you declare
    event Deposit(uint256 amount, uint256 when, address caller);
    event Withdrawal(uint256 amount, uint256 when);

    // Constructor code is only run when the contract
    // is created
    constructor(uint256 _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }


   // spot the error here
  function deposit(uint256 amount) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(amount != 0, "cannot deposit 0 amount");

        totalColabBalance += amount;

        emit Deposit(amount, block.timestamp, msg.sender);


    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
