const ConcertToken = artifacts.require("./ConcertToken.sol");

module.exports = function (deployer) {
  deployer.deploy(ConcertToken);
};
