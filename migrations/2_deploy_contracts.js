const Challanges = artifacts.require("Challenge");

module.exports = function (deployer) {
  deployer.deploy(Challanges);
};