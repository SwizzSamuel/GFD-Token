var GLDToken = artifacts.require("./GLDToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");

module.exports = async function(deployer) {
  var addr = await web3.eth.getAccounts();
  await deployer.deploy(GLDToken, 1000000);
  await deployer.deploy(KycContract);
  await deployer.deploy(MyTokenSale, 1, addr[0], GLDToken.address, KycContract.address);
  var instance = await GLDToken.deployed();
  await instance.transfer(MyTokenSale.address, 1000000);
};
