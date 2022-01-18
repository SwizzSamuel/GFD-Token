var Token = artifacts.require("../contracts/GLDToken.sol");

var chai = require("./chaisetup");
var BN = web3.utils.BN;

var expect = chai.expect;

contract("Token test", async(accounts) => {
    var [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(1000000);
    });

    it("all tokens should be in the deployer account", async() => {
        var instance = await this.myToken;
        var totalSupply = await instance.totalSupply();

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to send tokens between accounts", async() => {
        var sendToken = 1;
        var instance = await this.myToken;
        var totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendToken)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    });

    it("should not be possible to more tokens than available", async() => {
        var instance = await this.myToken;
        var totalSupply = await instance.totalSupply();
        var Balance = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recipient, new BN(Balance + 1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(Balance);
    });
})