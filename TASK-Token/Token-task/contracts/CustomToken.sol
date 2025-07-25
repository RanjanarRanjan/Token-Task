// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 1000 * 10 ** decimals()); // Initial supply
    }

    /// @notice Only owner can mint new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @notice Redeem tokens in exchange for a reward (event-based)
    event Redeemed(address indexed user, uint256 amount, string reward);

    function redeem(uint256 amount, string calldata reward) external {
        // Burn the tokens from the user
        _burn(msg.sender, amount);
        
        // Emit the reward event
        emit Redeemed(msg.sender, amount, reward);
    }
}
