// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AstraResolver.sol";

/// @dev Mock ENS Registry for testing
contract MockENS {
    mapping(bytes32 => address) private owners;
    
    function setOwner(bytes32 node, address owner) external {
        owners[node] = owner;
    }
    
    function owner(bytes32 node) external view returns (address) {
        return owners[node];
    }
}

/// @dev Mock NameWrapper for testing wrapped name ownership
contract MockNameWrapper {
    mapping(uint256 => address) private owners;
    
    function setOwner(uint256 id, address owner) external {
        owners[id] = owner;
    }
    
    function ownerOf(uint256 id) external view returns (address) {
        return owners[id];
    }
}

contract AstraResolverTest is Test {
    AstraResolver public resolver;
    MockENS public ens;
    MockNameWrapper public nameWrapper;
    
    address public owner = address(0x1);
    address public attacker = address(0x2);
    bytes32 public testNode = keccak256("test.eth");
    
    function setUp() public {
        ens = new MockENS();
        nameWrapper = new MockNameWrapper();
        resolver = new AstraResolver(address(ens), address(nameWrapper));
        
        // Set up owner for test node
        ens.setOwner(testNode, owner);
    }
    
    // ============================================================
    // ACCESS CONTROL TESTS
    // ============================================================
    
    /// @notice Test that owner can set uint records
    function test_OwnerCanSetUintRecord() public {
        vm.prank(owner);
        resolver.setUintRecord(testNode, "ast_drawdown", 500);
        
        assertEq(resolver.uintRecord(testNode, "ast_drawdown"), 500);
    }
    
    /// @notice Test that non-owner CANNOT set uint records
    function test_NonOwnerCannotSetUintRecord() public {
        vm.prank(attacker);
        vm.expectRevert(AstraResolver.Unauthorized.selector);
        resolver.setUintRecord(testNode, "ast_drawdown", 500);
    }
    
    /// @notice Test that owner can set text records
    function test_OwnerCanSetTextRecord() public {
        vm.prank(owner);
        resolver.setTextRecord(testNode, "ast_viban", "DE89370400440532013000");
        
        assertEq(resolver.textRecord(testNode, "ast_viban"), "DE89370400440532013000");
    }
    
    /// @notice Test that non-owner CANNOT set text records
    function test_NonOwnerCannotSetTextRecord() public {
        vm.prank(attacker);
        vm.expectRevert(AstraResolver.Unauthorized.selector);
        resolver.setTextRecord(testNode, "ast_viban", "ATTACK!");
    }
    
    /// @notice Test that non-owner CANNOT set all records
    function test_NonOwnerCannotSetAllRecords() public {
        vm.prank(attacker);
        vm.expectRevert(AstraResolver.Unauthorized.selector);
        resolver.setAllRecords(testNode, 500, 1000, 500, "DE89370400440532013000");
    }
    
    // ============================================================
    // KEY VALIDATION TESTS
    // ============================================================
    
    /// @notice Test that invalid uint keys are rejected
    function test_InvalidUintKeyRejected() public {
        vm.prank(owner);
        vm.expectRevert(AstraResolver.InvalidRecordKey.selector);
        resolver.setUintRecord(testNode, "invalid_key", 500);
    }
    
    /// @notice Test that invalid text keys are rejected
    function test_InvalidTextKeyRejected() public {
        vm.prank(owner);
        vm.expectRevert(AstraResolver.InvalidRecordKey.selector);
        resolver.setTextRecord(testNode, "invalid_key", "value");
    }
    
    // ============================================================
    // WRAPPED NAME OWNERSHIP TESTS
    // ============================================================
    
    /// @notice Test that wrapped name owner can set records
    function test_WrappedNameOwnerCanSetRecords() public {
        // Set the ENS owner to be the NameWrapper
        ens.setOwner(testNode, address(nameWrapper));
        // Set the wrapped name owner
        nameWrapper.setOwner(uint256(testNode), owner);
        
        vm.prank(owner);
        resolver.setUintRecord(testNode, "ast_drawdown", 750);
        
        assertEq(resolver.uintRecord(testNode, "ast_drawdown"), 750);
    }
    
    /// @notice Test that attacker cannot impersonate wrapped name owner
    function test_AttackerCannotImpersonateWrappedOwner() public {
        ens.setOwner(testNode, address(nameWrapper));
        nameWrapper.setOwner(uint256(testNode), owner);
        
        vm.prank(attacker);
        vm.expectRevert(AstraResolver.Unauthorized.selector);
        resolver.setUintRecord(testNode, "ast_drawdown", 9999);
    }
    
    // ============================================================
    // RECORD ISOLATION TESTS
    // ============================================================
    
    /// @notice Test that records are isolated per node
    function test_RecordsIsolatedPerNode() public {
        bytes32 node1 = keccak256("agent1.astra.eth");
        bytes32 node2 = keccak256("agent2.astra.eth");
        
        address owner1 = address(0x10);
        address owner2 = address(0x20);
        
        ens.setOwner(node1, owner1);
        ens.setOwner(node2, owner2);
        
        vm.prank(owner1);
        resolver.setUintRecord(node1, "ast_drawdown", 100);
        
        vm.prank(owner2);
        resolver.setUintRecord(node2, "ast_drawdown", 200);
        
        // Verify isolation
        assertEq(resolver.uintRecord(node1, "ast_drawdown"), 100);
        assertEq(resolver.uintRecord(node2, "ast_drawdown"), 200);
        
        // Verify owner1 cannot modify node2
        vm.prank(owner1);
        vm.expectRevert(AstraResolver.Unauthorized.selector);
        resolver.setUintRecord(node2, "ast_drawdown", 999);
    }
    
    // ============================================================
    // INTEGRATION TESTS
    // ============================================================
    
    /// @notice Test setAllRecords followed by getAllRecords
    function test_SetAndGetAllRecords() public {
        vm.prank(owner);
        resolver.setAllRecords(
            testNode,
            500,        // drawdown: 5% in basis points
            1 ether,    // max trade: 1 ETH
            0.5 ether,  // min liquidity: 0.5 ETH
            "GB82WEST12345698765432"
        );
        
        (uint256 drawdown, uint256 maxTrade, uint256 minLiq, string memory viban) = 
            resolver.getAllRecords(testNode);
        
        assertEq(drawdown, 500);
        assertEq(maxTrade, 1 ether);
        assertEq(minLiq, 0.5 ether);
        assertEq(viban, "GB82WEST12345698765432");
    }
}
