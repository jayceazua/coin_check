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
})