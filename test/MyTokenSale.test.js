var Token = artifacts.require("../contracts/GLDToken.sol");
var TokenSale = artifacts.require("../contracts/MyTokenSale.sol");

var chai = require("./chaisetup");
var BN = web3.utils.BN;
var expect = chai.expect;

contract("TokenSale Test", async(accounts) => {
    var [deployerAccount, recipient, anotherAccount] = accounts;

    it("should be no tokens in the deployerAccount", async() => {
        var instance = await Token.deployed();

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the Tokensale address", async() => {
        var instance = await Token.deployed();
        var Balance = await instance.balanceOf(TokenSale.address);
        var totalSupply = await Token.totalSupply();

        return expect(Balance).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("should be able to purchase tokens", async() => {
        var TokenInstance = await Token.deployed();
        var TokenSaleInstance = await TokenSale.deployed();
        var PreviousBalance = await TokenInstance.balanceOf(deployerAccount);
        expect(TokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(TokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(PreviousBalance.sub(new BN(1)));
    })
})