pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ChallengeCoin is ERC721Full, Ownable {

    string[] public images;

    constructor(string memory _name, string memory _symbol) public ERC721Full(_name, _symbol) {
    }

    function getMCC(uint _mccId) public view returns (string memory) {
        return images[_mccId];

    }

    function getNumImages() public view returns (uint) {
        return images.length;
    }

    function mint(string memory _mccUri) public payable onlyOwner {
        uint _mccId = images.push(_mccUri);
        _mint(msg.sender, _mccId);
    }
}