const ConcertToken = artifacts.require("./ConcertToken.sol");

contract("ConcertToken", (accounts) => {
  let tokenInstance;

  it("initializes the contract with correct values", () => {
    return ConcertToken.deployed().then((instance) => {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then((name) => {
      assert.equal(name, "Concert Coin", "has correct name");
      return tokenInstance.symbol();
    }).then((symbol) => {
      assert.equal(symbol, "ASOT", "has correct symbol");
      return tokenInstance.standard();
    }).then((standard) => {
      assert.equal(standard, "Concert Coin v1.0", "has correct standard");
    })
  })

  it("allocates initial supply upon deployment", () => {

    return ConcertToken.deployed().then((instance) => {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then((totalSupply) => {

      assert.equal(totalSupply.toNumber(), 1000000, "sets totalSupply to 1M.");
      return tokenInstance.balanceOf(accounts[0]);
    }).then((adminBalance) => {

      assert.equal(adminBalance.toNumber(), 1000000, "allocates initial supply to the admin account");
    })

  })

  it("transfer token ownership", () => {
    return ConcertToken.deployed().then((instance) => {
      tokenInstance = instance;
      // test requiring first by transferring something larger than sender's balance
      return tokenInstance.transfer.call(accounts[1], 999999999999999999);
    }).then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, " error message must contain revert");
      return tokenInstance.transfer(accounts[1], 25000, {from: accounts[0]})
    }).then((receipt) => {
      return tokenInstance.balanceOf(accounts[1])
    }).then(()=> {
      assert.equal(balance.toNumber(), 25000, 'adds the amount to the receiving account')
    })
  })






})