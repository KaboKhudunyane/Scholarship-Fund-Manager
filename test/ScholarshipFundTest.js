const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScholarshipFund", function () {
  let ScholarshipFund, scholarshipFund, owner, addr1, addr2;

  beforeEach(async function () {
    ScholarshipFund = await ethers.getContractFactory("ScholarshipFund");
    [owner, addr1, addr2, _] = await ethers.getSigners();

    scholarshipFund = await ScholarshipFund.deploy();
    await scholarshipFund.deployed();
  });

  it("Should register a scholar", async function () {
    await scholarshipFund.registerScholar("John Doe", "john@example.com");
    const scholar = await scholarshipFund.getScholar(1);
    expect(scholar.name).to.equal("John Doe");
  });

  it("Should allow donations", async function () {
    await scholarshipFund.connect(addr1).donate({ value: ethers.utils.parseEther("1") });
    const totalFunds = await scholarshipFund.getTotalFunds();
    expect(totalFunds).to.equal(ethers.utils.parseEther("1"));
  });

  it("Should allocate funds to a scholar", async function () {
    await scholarshipFund.registerScholar("John Doe", "john@example.com");
    await scholarshipFund.connect(addr1).donate({ value: ethers.utils.parseEther("1") });
    await scholarshipFund.allocateFunds(1, ethers.utils.parseEther("0.5"));
    const scholar = await scholarshipFund.getScholar(1);
    expect(scholar.amountAwarded).to.equal(ethers.utils.parseEther("0.5"));
  });
});
