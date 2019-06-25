pragma solidity ^0.5.8;

contract ConcertToken {
  string public name = "Concert Coin";
  string public symbol = "ASOT";
  string public standard = "Concert Coin v1.0";
  // constructor
  // set the total number of tokens
  // read the total number of tokens
  uint256 public totalSupply;

  mapping(address => uint256) public balanceOf;

  constructor(uint256 _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
    // allocate the initial supply
  }

  // transfer
  function transfer(address _to, uint256 _value) public view returns (bool success) {
    // exceotion if account does not have enough
    require(balanceOf[msg.sender] >= _value, "there is not enough...");
    
    // return bool
    // transfer event

  }
}