// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PortfolioManager is Ownable {
    struct Asset {
        address token;
        uint256 allocation; // Allocation percentage (scaled to 10000, e.g., 2500 = 25%)
    }

    mapping(address => Asset[]) private userPortfolios;
    mapping(address => uint256) private userBalances;

    event Deposited(address indexed user, address token, uint256 amount);
    event Withdrawn(address indexed user, address token, uint256 amount);
    event Rebalanced(address indexed user, Asset[] newAllocations);

    function deposit(address token, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        userBalances[msg.sender] += amount;
        emit Deposited(msg.sender, token, amount);
    }

    function withdraw(address token, uint256 amount) external {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        IERC20(token).transfer(msg.sender, amount);
        userBalances[msg.sender] -= amount;
        emit Withdrawn(msg.sender, token, amount);
    }

    function rebalance(Asset[] calldata newAllocations) external onlyOwner {
        delete userPortfolios[msg.sender];
        uint256 totalAllocation;
        for (uint256 i = 0; i < newAllocations.length; i++) {
            userPortfolios[msg.sender].push(newAllocations[i]);
            totalAllocation += newAllocations[i].allocation;
        }
        require(totalAllocation == 10000, "Allocations must sum to 100%");
        emit Rebalanced(msg.sender, newAllocations);
    }

    function getPortfolio(address user) external view returns (Asset[] memory) {
        return userPortfolios[user];
    }
}
