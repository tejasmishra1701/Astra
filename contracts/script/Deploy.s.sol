// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/AstraResolver.sol";

/**
 * @title Deploy AstraResolver
 * @notice Deployment script for the AstraResolver contract
 * @dev Run with: forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
 * 
 * Environment Variables:
 *   - PRIVATE_KEY: Deployer private key
 *   - ENS_REGISTRY: ENS Registry address for target network
 *   - NAME_WRAPPER: NameWrapper address for target network
 * 
 * Network Addresses:
 *   Mainnet:
 *     - ENS Registry: 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
 *     - NameWrapper:  0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401
 *   Sepolia:
 *     - ENS Registry: 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
 *     - NameWrapper:  0x0635513f179D50A207757E05759CbD106d7dFcE8
 */
contract DeployAstraResolver is Script {
    // Default to Sepolia addresses
    address constant SEPOLIA_ENS_REGISTRY = 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e;
    address constant SEPOLIA_NAME_WRAPPER = 0x0635513f179D50A207757E05759CbD106d7dFcE8;
    
    // Mainnet addresses
    address constant MAINNET_ENS_REGISTRY = 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e;
    address constant MAINNET_NAME_WRAPPER = 0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401;

    function run() external {
        // Load configuration from environment or use Sepolia defaults
        address ensRegistry = vm.envOr("ENS_REGISTRY", SEPOLIA_ENS_REGISTRY);
        address nameWrapper = vm.envOr("NAME_WRAPPER", SEPOLIA_NAME_WRAPPER);
        
        // Load private key
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("========================================");
        console.log("       ASTRA RESOLVER DEPLOYMENT        ");
        console.log("========================================");
        console.log("");
        console.log("Deployer:", deployer);
        console.log("ENS Registry:", ensRegistry);
        console.log("NameWrapper:", nameWrapper);
        console.log("");
        
        // Start broadcast
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy AstraResolver
        AstraResolver resolver = new AstraResolver(ensRegistry, nameWrapper);
        
        vm.stopBroadcast();
        
        // Log results
        console.log("========================================");
        console.log("         DEPLOYMENT SUCCESSFUL          ");
        console.log("========================================");
        console.log("");
        console.log("AstraResolver deployed at:", address(resolver));
        console.log("");
        console.log("Next steps:");
        console.log("  1. Copy the address above to backend/.env");
        console.log("  2. Verify on Etherscan:");
        console.log("     forge verify-contract <ADDRESS> AstraResolver --chain sepolia");
        console.log("");
    }
    
    /**
     * @notice Deploy to Sepolia testnet with default addresses
     */
    function deploySepolia() external {
        _deploy(SEPOLIA_ENS_REGISTRY, SEPOLIA_NAME_WRAPPER);
    }
    
    /**
     * @notice Deploy to Mainnet with default addresses
     */
    function deployMainnet() external {
        _deploy(MAINNET_ENS_REGISTRY, MAINNET_NAME_WRAPPER);
    }
    
    /**
     * @notice Internal deployment function
     */
    function _deploy(address ensRegistry, address nameWrapper) internal {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        console.log("Deploying AstraResolver...");
        console.log("ENS Registry:", ensRegistry);
        console.log("NameWrapper:", nameWrapper);
        
        vm.startBroadcast(deployerPrivateKey);
        
        AstraResolver resolver = new AstraResolver(ensRegistry, nameWrapper);
        
        vm.stopBroadcast();
        
        console.log("");
        console.log("AstraResolver deployed at:", address(resolver));
    }
}
