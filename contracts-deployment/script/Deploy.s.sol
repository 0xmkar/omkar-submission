// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TokenFactory.sol";
import "../src/BrigeToken.sol";
import "../src/Token.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy TokenFactory
        TokenFactory tokenFactory = new TokenFactory();
        console.log("TokenFactory deployed at:", address(tokenFactory));

        // Example: Deploy a BridgeToken instance
        // Uncomment and modify as needed:
        // BridgeToken bridgeToken = new BridgeToken();
        // console.log("BridgeToken deployed at:", address(bridgeToken));

        vm.stopBroadcast();
    }
}
