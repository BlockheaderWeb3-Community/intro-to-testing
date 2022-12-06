const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("ColabBank Test Suite", async () => {


    async function deployOneYearLockFixture() {
        const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        const ColabBankV2 = await ethers.getContractFactory("ColabBankV2");
        const colabBankV2 = await ColabBankV2.deploy();


        return { owner, addr1, addr2, addr3, addr4, colabBankV2 };
    }


    describe("Deposit", async () => {
        it.only("should successfully deposit", async () => {
            const { colabBankV2, addr1 } = await loadFixture(deployOneYearLockFixture);

        })
    })

    describe("Withdrawal", async () => {
        // write PoC for the vulnerability
        it("", async () => {
            
        })
    })

})