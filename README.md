# AI-Powered Multi-Chain Portfolio Advisor

## Overview
This project is a cutting-edge AI-driven portfolio advisor built on the Cronos blockchain. It leverages the Crypto.com AI Agent SDK and integrates with Cronos APIs, offering dynamic portfolio management based on real-time data and user preferences.

## Features
- **AI-Driven Portfolio Management**: Utilizes AI to recommend and rebalance portfolios dynamically.
- **Multi-Chain Integration**: Fetches and processes data from multiple blockchains via Cronos RPC and Explorer APIs.
- **Reward Mechanism**: Users earn $REWARD tokens for staking and participating in governance.
- **Oracle Integration**: Updates portfolio allocations based on real-time market data.

## Smart Contracts
The platform is powered by the following smart contracts:
1. **RewardToken.sol**: Implements an ERC-20 token for incentivization.
2. **Governance.sol**: Handles on-chain decision-making and voting.
3. **SecurityLayer.sol**: Provides risk assessment and access control.
4. **OracleConnector.sol**: Fetches and processes off-chain market data.
5. **Staking.sol**: Manages staking and reward distribution.
6. **PortfolioManager.sol**: Orchestrates portfolio rebalancing and user management.

## How It Works
1. **Data Integration**: Integrates with Cronos RPC URLs and APIs to fetch real-time market data.
2. **AI-Driven Insights**: Uses the Crypto.com AI Agent SDK for predictive analytics and asset allocation.
3. **User Engagement**: Incentivizes users with rewards for staking and active participation.

## Getting Started
### Prerequisites
- Node.js (v16+)
- Hardhat
- Cronos RPC URL and API key
- Crypto.com AI Agent SDK: Install via:

  npm install @crypto.com/ai-agent-client

**Setup**
Clone the repository.

git clone https://github.com/Hackathonzx/cryptominds.git

cd cryptominds

**Install dependencies:**

npm install

**Configure .env file:**

env

RPC_URL=https://rpc-testnet.cronos.org

PRIVATE_KEY=your_private_key

ETHERSCAN_API_KEY=your_cronos_api_key

**Compile the contracts:**

npx hardhat compile

## Deployment

Deploy the contract by running:

npx hardhat run ignition/modules/deploy.js --network cronosTestnet

Here are the deployed addresses:

RewardToken deployed to: 0x359451AC3C73827A7653C0Ab7D30243844a55447

Governance deployed to: 0x069F92465a8795a06A28B1e85f320D57CE29Bc8F

SecurityLayer deployed to: 0x7c9D4E3769FD085566de1DB20E5703D3Ec50d37f

OracleConnector deployed to: 0xe34c86A03F17E29F77beeE7c898Adae4dD578006

Staking deployed to: 0x7516abedc7e8ca01143ad636a6963B9887FC7Cf6

PortfolioManager deployed to: 0xA0BF7F60ec762cc7b88dEc415D46F12cFF130a55

Link to the explorer:

## Testing

Run tests:

npx hardhat test

# Contributing
- Fork the Repository:
- Create a New Branch:
git checkout -b feature/your-feature
- Make Changes and Commit:
git add .
git commit -m "Add feature"
Push Changes:
git push origin feature/your-feature

# License
This project is licensed under the MIT License.








