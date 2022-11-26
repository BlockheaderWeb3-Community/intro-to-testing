// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract ColabBankV2 {

    mapping(address => uint256) public balances;
    address payable public owner;

    event Deposit(uint256 amount, uint256 when, address caller);
    event Withdrawal(uint256 amount, uint256 when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    // spot the vulnerability
    function deposit() public payable {
        require(msg.value != 0, "cannot deposit 0 ETH");
        uint256 value = msg.value;
        balances[msg.sender] += value;
        emit Deposit(value, block.timestamp, msg.sender);
    }

    // spot the vulnerability in this function
    function withdraw() public {
        require(balances[msg.sender] != 0, "you have 0 ETH deposit");
        uint256 amount = balances[msg.sender];
        payable(msg.sender).transfer(address(this).balance);
        emit Withdrawal(amount, block.timestamp);
    }

    receive() external payable {}
}
