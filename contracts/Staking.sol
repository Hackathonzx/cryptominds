// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    struct Staker {
        uint256 amountStaked;
        uint256 rewards;
        uint256 lastUpdate;
    }

    IERC20 public stakingToken;
    uint256 public rewardRate; // Rewards per second
    mapping(address => Staker) public stakers;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _stakingToken, uint256 _rewardRate) {
        stakingToken = IERC20(_stakingToken);
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external {
        updateRewards(msg.sender);
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakers[msg.sender].amountStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(stakers[msg.sender].amountStaked >= amount, "Insufficient staked amount");
        updateRewards(msg.sender);
        stakers[msg.sender].amountStaked -= amount;
        stakingToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function claimRewards() external {
        updateRewards(msg.sender);
        uint256 rewards = stakers[msg.sender].rewards;
        stakers[msg.sender].rewards = 0;
        stakingToken.transfer(msg.sender, rewards);
        emit RewardClaimed(msg.sender, rewards);
    }

    function updateRewards(address user) internal {
        uint256 timeElapsed = block.timestamp - stakers[user].lastUpdate;
        stakers[user].rewards += stakers[user].amountStaked * rewardRate * timeElapsed / 1e18;
        stakers[user].lastUpdate = block.timestamp;
    }
}
