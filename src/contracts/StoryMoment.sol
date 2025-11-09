// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StoryMoment is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // The base URI for all token metadata. e.g., "ipfs://<YOUR_CID>/"
    string private _baseTokenURI;

    constructor(string memory baseTokenURI) ERC721("AI Crypto Story Moment", "MOMENT") Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
    }

    // The core minting function, callable only by the backend (owner).
    // It mints the NFT directly to the user's wallet address.
    function mintMoment(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // Returns the URI for a given token's metadata.
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    // Allows the backend to update the base URI if metadata location changes.
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }
}
