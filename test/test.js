const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AI-Powered Multi-Chain Portfolio Advisor", function () {
  let rewardToken, governance, securityLayer, oracleConnector, staking, portfolioManager;
  let owner, user1, user2;

  before(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy RewardToken - No constructor parameters
    const RewardToken = await ethers.getContractFactory("RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.waitForDeployment();

    // Deploy Governance - Assuming it doesn't need parameters
    const Governance = await ethers.getContractFactory("Governance");
    governance = await Governance.deploy(); // No parameters passed unless specified
    await governance.waitForDeployment();

    // Deploy SecurityLayer - No constructor parameters
    const SecurityLayer = await ethers.getContractFactory("SecurityLayer");
    securityLayer = await SecurityLayer.deploy();
    await securityLayer.waitForDeployment();

    // Deploy OracleConnector - No constructor parameters
    const OracleConnector = await ethers.getContractFactory("OracleConnector");
    oracleConnector = await OracleConnector.deploy();
    await oracleConnector.waitForDeployment();

    // Deploy Staking - Expects rewardToken address
    const Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(rewardToken.target); // Ensure rewardToken.target is the correct address
    await staking.waitForDeployment();

    // Deploy PortfolioManager - Requires SecurityLayer, OracleConnector, Staking, Governance addresses
    const PortfolioManager = await ethers.getContractFactory("PortfolioManager");
    portfolioManager = await PortfolioManager.deploy(
      securityLayer.target,
      oracleConnector.target,
      staking.target,
      governance.target // Ensure governance is passed if required
    );
    await portfolioManager.waitForDeployment();
  });

  it("should deploy all contracts successfully", async function () {
    expect(rewardToken.target).to.properAddress;
    expect(governance.target).to.properAddress;
    expect(securityLayer.target).to.properAddress;
    expect(oracleConnector.target).to.properAddress;
    expect(staking.target).to.properAddress;
    expect(portfolioManager.target).to.properAddress;
  });

  // RewardToken Tests
  it("should mint tokens to a user", async function () {
    await rewardToken.mint(user1.address, ethers.parseEther("100"));
    expect(await rewardToken.balanceOf(user1.address)).to.equal(ethers.parseEther("100"));
  });

  // Governance Tests
  it("should allow governance proposals and voting", async function () {
    const tx = await governance.createProposal("Increase staking rewards");
    await tx.wait();

    const proposal = await governance.getProposal(0);
    expect(proposal.description).to.equal("Increase staking rewards");

    await governance.connect(owner).vote(0, true); // Vote "yes"
    const proposalStatus = await governance.getProposalStatus(0);
    expect(proposalStatus.approved).to.be.true;
  });

  // SecurityLayer Tests
  it("should verify security access", async function () {
    await securityLayer.setWhitelisted(user1.address, true);
    expect(await securityLayer.isWhitelisted(user1.address)).to.be.true;

    expect(await securityLayer.isWhitelisted(user2.address)).to.be.false;
  });

  // OracleConnector Tests
  it("should set and get oracle data", async function () {
    await oracleConnector.setOracleData("BTC/USD", ethers.parseEther("60000"));
    const btcPrice = await oracleConnector.getOracleData("BTC/USD");
    expect(btcPrice).to.equal(ethers.parseEther("60000"));
  });

  // Staking Tests
  it("should allow staking and reward distribution", async function () {
    // Mint and approve tokens
    await rewardToken.mint(user1.address, ethers.parseEther("50"));
    await rewardToken.connect(user1).approve(staking.target, ethers.parseEther("50"));

    // Stake tokens
    await staking.connect(user1).stake(ethers.parseEther("50"));
    expect(await staking.balanceOf(user1.address)).to.equal(ethers.parseEther("50"));

    // Distribute rewards
    await staking.distributeRewards();
    const rewards = await rewardToken.balanceOf(user1.address);
    expect(rewards).to.be.gt(0);
  });

  // PortfolioManager Tests
  it("should rebalance portfolio based on oracle data", async function () {
    // Simulate oracle data updates
    await oracleConnector.setOracleData("BTC/USD", ethers.parseEther("60000"));
    await oracleConnector.setOracleData("ETH/USD", ethers.parseEther("4000"));

    // Perform rebalance
    const rebalanceTx = await portfolioManager.rebalancePortfolio(user1.address);
    await rebalanceTx.wait();

    const allocation = await portfolioManager.getPortfolioAllocation(user1.address);
    expect(allocation).to.not.be.empty;
  });

  // Integration Tests
  it("should integrate governance and security with portfolio updates", async function () {
    // Create and approve proposal to enable security checks for rebalancing
    await governance.createProposal("Enable security checks for portfolio updates");
    await governance.connect(owner).vote(0, true);
    expect((await governance.getProposalStatus(0)).approved).to.be.true;

    // Simulate security layer restricting user2
    await securityLayer.setWhitelisted(user2.address, false);

    // Attempt portfolio update for user2
    await expect(portfolioManager.rebalancePortfolio(user2.address)).to.be.revertedWith(
      "SecurityLayer: User not whitelisted"
    );
  });
});
