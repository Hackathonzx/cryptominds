const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy RewardToken.sol
    console.log("Deploying RewardToken...");
    const RewardToken = await hre.ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy();
    await rewardToken.waitForDeployment();
    console.log("RewardToken deployed to:", await rewardToken.getAddress());

    // Deploy Governance.sol
    console.log("Deploying Governance...");
    const Governance = await hre.ethers.getContractFactory("Governance");
    const governance = await Governance.deploy();
    await governance.waitForDeployment();
    console.log("Governance deployed to:", await governance.getAddress());

    // Deploy SecurityLayer.sol
    console.log("Deploying SecurityLayer...");
    const SecurityLayer = await hre.ethers.getContractFactory("SecurityLayer");
    const securityLayer = await SecurityLayer.deploy();
    await securityLayer.waitForDeployment();
    console.log("SecurityLayer deployed to:", await securityLayer.getAddress());

    // Deploy OracleConnector.sol
    console.log("Deploying OracleConnector...");
    const OracleConnector = await hre.ethers.getContractFactory("OracleConnector");
    const oracleConnector = await OracleConnector.deploy();
    await oracleConnector.waitForDeployment();
    console.log("OracleConnector deployed to:", await oracleConnector.getAddress());

    // Deploy Staking.sol
    console.log("Deploying Staking...");
    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(rewardToken.address, hre.ethers.parseEther("0.01")); // Example reward rate
    await staking.waitForDeployment();
    console.log("Staking deployed to:", await staking.getAddress());

    // Deploy PortfolioManager.sol
    console.log("Deploying PortfolioManager...");
    const PortfolioManager = await hre.ethers.getContractFactory("PortfolioManager");
    const portfolioManager = await PortfolioManager.deploy();
    await portfolioManager.waitForDeployment();
    console.log("PortfolioManager deployed to:", await portfolioManager.getAddress());

    console.log("\nAll contracts deployed successfully!");
    console.log("RewardToken:", rewardToken.address);
    console.log("Governance:", governance.address);
    console.log("SecurityLayer:", securityLayer.address);
    console.log("OracleConnector:", oracleConnector.address);
    console.log("Staking:", staking.address);
    console.log("PortfolioManager:", portfolioManager.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
