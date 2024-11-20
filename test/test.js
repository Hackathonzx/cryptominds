const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StoryCrafters Contracts", function () {
  let GuildSystem, guildSystem;
  let NFTMarketplace, nftMarketplace;
  let StoryNFT, storyNFT;
  let Voting, voting;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy GuildSystem contract
    GuildSystem = await ethers.getContractFactory("GuildSystem");
    guildSystem = await GuildSystem.deploy();
    await guildSystem.waitForDeployment();

    // Deploy StoryNFT contract
    StoryNFT = await ethers.getContractFactory("StoryNFT");
    storyNFT = await StoryNFT.deploy();
    await storyNFT.waitForDeployment();

    // Deploy NFTMarketplace contract
    NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.waitForDeployment();

    // Deploy Voting contract
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.waitForDeployment();
  });

  // GuildSystem Tests
  describe("GuildSystem", function () {
    it("Should allow users to create a guild", async function () {
      await guildSystem.createGuild("Guild1");
      const guild = await guildSystem.getGuild(1);
      expect(guild.name).to.equal("Guild1");
    });

    it("Should allow joining a guild", async function () {
      await guildSystem.createGuild("Guild2");
      await guildSystem.connect(addr1).joinGuild(1);
      const guildMembers = await guildSystem.getGuildMembers(1);
      expect(guildMembers).to.include(addr1.address);
    });
  });

  // NFTMarketplace Tests
  describe("NFTMarketplace", function () {
    beforeEach(async function () {
      // Mint an NFT to owner and approve the marketplace
      await storyNFT.mintNFT(owner.address, "marketplaceURI");
      await storyNFT.approve(nftMarketplace.address, 1);
    });

    it("Should list NFT on marketplace", async function () {
      await nftMarketplace.listNFT(storyNFT.address, 1, ethers.parseEther("1"));
      const listing = await nftMarketplace.getListing(storyNFT.address, 1);
      expect(listing.price).to.equal(ethers.utils.parseEther("1"));
    });

    it("Should allow user to buy NFT from marketplace", async function () {
      await nftMarketplace.listNFT(storyNFT.address, 1, ethers.parseEther("1"));
      await nftMarketplace.connect(addr1).buyNFT(storyNFT.address, 1, { value: ethers.parseEther("1") });
      const newOwner = await storyNFT.ownerOf(1);
      expect(newOwner).to.equal(addr1.address);
    });
  });

  // StoryNFT Tests
  describe("StoryNFT", function () {
    it("Should mint a new NFT and assign it to owner", async function () {
      await storyNFT.mintNFT(owner.address, "tokenURI1");
      const balance = await storyNFT.balanceOf(owner.address);
      expect(balance).to.equal(1);
    });

    it("Should return the correct token URI", async function () {
      await storyNFT.mintNFT(owner.address, "tokenURI2");
      const tokenURI = await storyNFT.tokenURI(1);
      expect(tokenURI).to.equal("tokenURI2");
    });
  });

  // Voting Tests
  describe("Voting", function () {
    beforeEach(async function () {
      // Create a poll
      await voting.createPoll("Test Poll", ["Option A", "Option B"]);
    });

    it("Should allow users to cast a vote", async function () {
      await voting.connect(addr1).castVote(0, 1);
      const result = await voting.getVotes(0, 1);
      expect(result).to.equal(1);
    });

    it("Should tally votes correctly", async function () {
      await voting.connect(addr1).castVote(0, 0);
      await voting.connect(addr2).castVote(0, 0);
      const result = await voting.getVotes(0, 0);
      expect(result).to.equal(2);
    });

    it("Should prevent double voting from the same address", async function () {
      await voting.connect(addr1).castVote(0, 0);
      await expect(voting.connect(addr1).castVote(0, 0)).to.be.revertedWith("Already voted");
    });
  });
});
