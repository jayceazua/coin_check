const ChallengeLists = artifacts.require("ChallengeList");

module.exports = function (deployer) {
  deployer.deploy(ChallengeLists);
};
