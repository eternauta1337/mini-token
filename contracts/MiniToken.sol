//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MiniToken {
    mapping(address => uint) private _balances;

    uint private _totalSupply;

    constructor() {
        _totalSupply = 1000;
        _balances[msg.sender] = _totalSupply;
    }

    function mint(uint amount) external {
        _totalSupply += amount;
        _balances[msg.sender] += amount;
    }

    function burn(uint amount) external {
        _totalSupply -= amount;
        _balances[msg.sender] -= amount;
    }

    function transfer(address to, uint amount) external {
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
    }

    function balanceOf(address who) external view returns (uint) {
        return _balances[who];
    }

    function getTotalSupply() external view returns (uint) {
        return _totalSupply;
    }
}
