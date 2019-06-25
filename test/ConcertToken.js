const ConcertToken = artifacts.require("./ConcertToken.sol");

contract("ConcertToken", () => {
  it("sets the total supply amount upon deployment", () => {
    return ConcertToken.deployed().then((instance) => {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then((totalSupply) => {
      assert.equal(totalSupply.toNumber(), 1000000, "sets totalSupply to 1M.");
    })
  })
})