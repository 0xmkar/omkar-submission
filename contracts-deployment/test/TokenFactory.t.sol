// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/TokenFactory.sol";
import "../src/Token.sol";

contract TokenFactoryTest is Test {
    TokenFactory public tokenFactory;
    address public user = address(0x1);

    function setUp() public {
        tokenFactory = new TokenFactory();
    }

    function testCreateToken() public {
        uint256 initialSupply = 1000000;
        uint8 decimals = 18;
        string memory name = "Test Token";
        string memory symbol = "TEST";
        uint salt = 1;

        vm.prank(user);
        address tokenAddress = tokenFactory.createToken(
            name,
            symbol,
            initialSupply,
            decimals,
            salt
        );

        assertEq(tokenFactory.TokenList(0), tokenAddress);

        Token token = Token(tokenAddress);
        assertEq(token.name(), name);
        assertEq(token.symbol(), symbol);
        assertEq(token.decimals(), decimals);
        assertEq(token.balanceOf(user), initialSupply * 10 ** decimals);
    }

    function testGetTokenList() public {
        assertEq(tokenFactory.getTokenList().length, 0);

        tokenFactory.createToken("Token1", "TK1", 1000000, 18, 1);
        assertEq(tokenFactory.getTokenList().length, 1);

        tokenFactory.createToken("Token2", "TK2", 1000000, 18, 2);
        assertEq(tokenFactory.getTokenList().length, 2);
    }
}
