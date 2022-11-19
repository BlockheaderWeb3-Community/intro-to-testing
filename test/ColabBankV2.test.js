const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe("ColabBank Test Suite", async () => {


    async function deployOneYearLockFixture() {
        const TIME = 60 * 60;
        const ONE_GWEI = 1_000_000_000;

        const lockedAmount = ONE_GWEI;
        const unlockTime = await time.latest() + TIME;

        const currentTime = await time.latest()

        const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        const ColabBank = await ethers.getContractFactory("ColabBank");
        const colabBank = await ColabBank.deploy(unlockTime, { value: lockedAmount });


        return { unlockTime, lockedAmount, owner, addr1, addr2, addr3, addr4, colabBank, currentTime };
    }

    
    describe("Deposits", async () => {
        it("should successfully deposit", async () => {
            const { colabBank, addr1 } = await loadFixture(deployOneYearLockFixture);
            
            const addr1BalanceBeforeDeposit = await colabBank.balances(addr1.address)
            console.log("addr1 bal before__", addr1BalanceBeforeDeposit)
            expect(addr1BalanceBeforeDeposit).to.eq(0)
            expect(colabBank.connect(addr1).deposit(0)).to.be.reverted
           const addr1DepositTxn =  await colabBank.connect(addr1).deposit(5)
            
            const addr1BalanceAfterDeposit = await colabBank.balances(addr1.address)
            expect(addr1BalanceAfterDeposit).to.eq(5)
            console.log("addr1 bal after__", addr1BalanceAfterDeposit)
            
            const totalColabBalance = await colabBank.totalColabBalance()
            console.log("total colab balance__", totalColabBalance)
            expect(totalColabBalance).to.eq(5)

            await expect(addr1DepositTxn).to.emit(colabBank, "Deposit").withArgs(5, anyValue, addr1.address)

    
        })
    })
    
    describe("Withdrawals", async () => {
        // write PoC for the vulnerability
        it("Should withdraw from ColabBank", async () => {
            const { colabBank, addr2 } = await loadFixture(deployOneYearLockFixture);
            
            const addr1BalanceBeforeWithdrawal = await colabBank.balances(addr2.address)
            console.log("addr1 bal before__", addr1BalanceBeforeWithdrawal)
            expect(Number(addr1BalanceBeforeWithdrawal)).to.eq(5)
            expect(colabBank.connect(addr2).withdraw(5)).to.be.reverted
           const addr1WithdrawalTxn =  await colabBank.connect(addr2).withdraw(5)

           const addr1BalanceAfterWithdrawal = await colabBank.balances(addr2.address)
            expect(Number(addr1BalanceAfterWithdrawal)).to.eq(0)
            console.log("addr1 bal after__", addr1BalanceAfterWithdrawal)
            
            const totalColabBalance = await colabBank.totalColabBalance()
            console.log("total colab balance__", totalColabBalance)
            expect(Number(totalColabBalance)).to.eq(0)

            await expect(Number(addr1WithdrawalTxn)).to.emit(colabBank, "Withdraw").withArgs(5, anyValue, addr2.address)
    
        })
    })

    //GETTING THIS OUTPUT
    // AssertionError: expected +0 to equal 5
    // + expected - actual

    // -0
    // +5

})