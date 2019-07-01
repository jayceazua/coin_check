const Metadata = artifacts.require('./Metadata.sol')
const Token = artifacts.require('./ChallengeCoin.sol')

let _ = '        '

module.exports = (deployer, helper, accounts) => {

  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      await deployer.deploy(Metadata);
      let metadata = await Metadata.deployed();
      console.log(_ + 'Metadata deployed at: ' + metadata.address);

      // Deploy ChallengeCoin.sol
      await deployer.deploy(Token, 'ChallengeCoin', 'MCC', metadata.address);

      let token = await Token.deployed();
      console.log(_ + 'ChallengeCoin deployed at: ' + token.address)

    } catch (error) {
      console.log(error)
    }
  })
}