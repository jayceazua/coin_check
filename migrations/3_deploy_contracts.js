const ChallengeCoin = artifacts.require("ChallengeCoin");

module.exports = function (deployer) {
  deployer.deploy(ChallengeCoin, "ChallengeCoin", "MCC");
};