// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract OracleConnector {
    mapping(address => address) public tokenPriceFeeds;

    function setPriceFeed(address token, address priceFeed) external {
        tokenPriceFeeds[token] = priceFeed;
    }

    function getPrice(address token) external view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(tokenPriceFeeds[token]);
        (, int256 price,,,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }
}
