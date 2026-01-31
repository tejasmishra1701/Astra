// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AstraResolver
 * @author ASTRA Project
 * @notice Custom ENS Resolver for agent policy records on the ASTRA terminal
 * @dev Implements custom uint256 and string record types with strict access control
 *      ensuring only the ENS node owner can update their agent's rules.
 * 
 * Custom Records:
 *   - ast_drawdown  (uint256) Maximum drawdown percentage (basis points, 0-10000)
 *   - ast_max_trade (uint256) Maximum trade size in wei
 *   - ast_min_liq   (uint256) Minimum liquidity requirement in wei
 *   - ast_viban     (string)  Virtual IBAN identifier for fiat gateway
 */

/// @notice Minimal ENS registry interface for ownership checks
interface IENS {
    function owner(bytes32 node) external view returns (address);
}

/// @notice Minimal INameWrapper interface for wrapped name ownership
interface INameWrapper {
    function ownerOf(uint256 id) external view returns (address);
}

contract AstraResolver {
    // ============================================================
    // EVENTS
    // ============================================================
    
    /// @notice Emitted when a uint256 record is updated
    event AstraUintRecordChanged(
        bytes32 indexed node,
        string indexed key,
        uint256 value
    );
    
    /// @notice Emitted when a text record is updated
    event AstraTextRecordChanged(
        bytes32 indexed node,
        string indexed key,
        string value
    );

    // ============================================================
    // STORAGE
    // ============================================================
    
    /// @notice ENS registry contract reference
    IENS public immutable ens;
    
    /// @notice Optional NameWrapper for wrapped ENS names
    INameWrapper public immutable nameWrapper;
    
    /// @notice Custom uint256 records: node => key => value
    mapping(bytes32 => mapping(string => uint256)) private _uintRecords;
    
    /// @notice Custom text records: node => key => value
    mapping(bytes32 => mapping(string => string)) private _textRecords;

    // ============================================================
    // CONSTANTS - Allowed Record Keys
    // ============================================================
    
    string public constant KEY_DRAWDOWN  = "ast_drawdown";
    string public constant KEY_MAX_TRADE = "ast_max_trade";
    string public constant KEY_MIN_LIQ   = "ast_min_liq";
    string public constant KEY_VIBAN     = "ast_viban";

    // ============================================================
    // ERRORS
    // ============================================================
    
    /// @notice Thrown when caller is not authorized to modify the node
    error Unauthorized();
    
    /// @notice Thrown when an invalid record key is provided
    error InvalidRecordKey();

    // ============================================================
    // CONSTRUCTOR
    // ============================================================
    
    /**
     * @notice Initialize the resolver with ENS registry reference
     * @param _ens Address of the ENS registry contract
     * @param _nameWrapper Address of the NameWrapper contract (can be address(0) if not used)
     */
    constructor(address _ens, address _nameWrapper) {
        ens = IENS(_ens);
        nameWrapper = INameWrapper(_nameWrapper);
    }

    // ============================================================
    // MODIFIERS
    // ============================================================
    
    /**
     * @notice Ensures caller is the owner of the ENS node
     * @dev Checks both direct ENS ownership and wrapped name ownership via NameWrapper
     * @param node The ENS namehash of the name being modified
     */
    modifier onlyNodeOwner(bytes32 node) {
        if (!_isAuthorised(node)) {
            revert Unauthorized();
        }
        _;
    }
    
    /**
     * @notice Validates that the key is an allowed uint256 record key
     * @param key The record key to validate
     */
    modifier validUintKey(string memory key) {
        if (!_isValidUintKey(key)) {
            revert InvalidRecordKey();
        }
        _;
    }
    
    /**
     * @notice Validates that the key is an allowed text record key
     * @param key The record key to validate
     */
    modifier validTextKey(string memory key) {
        if (!_isValidTextKey(key)) {
            revert InvalidRecordKey();
        }
        _;
    }

    // ============================================================
    // WRITE FUNCTIONS
    // ============================================================
    
    /**
     * @notice Set a uint256 record for an ENS node
     * @dev Only the node owner can call this function
     * @param node The ENS namehash of the name
     * @param key The record key (must be ast_drawdown, ast_max_trade, or ast_min_liq)
     * @param value The uint256 value to set
     */
    function setUintRecord(
        bytes32 node,
        string calldata key,
        uint256 value
    ) external onlyNodeOwner(node) validUintKey(key) {
        _uintRecords[node][key] = value;
        emit AstraUintRecordChanged(node, key, value);
    }
    
    /**
     * @notice Set a text record for an ENS node
     * @dev Only the node owner can call this function
     * @param node The ENS namehash of the name
     * @param key The record key (must be ast_viban)
     * @param value The string value to set
     */
    function setTextRecord(
        bytes32 node,
        string calldata key,
        string calldata value
    ) external onlyNodeOwner(node) validTextKey(key) {
        _textRecords[node][key] = value;
        emit AstraTextRecordChanged(node, key, value);
    }
    
    /**
     * @notice Convenience function to set all policy records at once
     * @dev Only the node owner can call this function
     * @param node The ENS namehash of the name
     * @param drawdown Maximum drawdown in basis points (0-10000)
     * @param maxTrade Maximum trade size in wei
     * @param minLiq Minimum liquidity requirement in wei
     * @param viban Virtual IBAN identifier
     */
    function setAllRecords(
        bytes32 node,
        uint256 drawdown,
        uint256 maxTrade,
        uint256 minLiq,
        string calldata viban
    ) external onlyNodeOwner(node) {
        _uintRecords[node][KEY_DRAWDOWN] = drawdown;
        _uintRecords[node][KEY_MAX_TRADE] = maxTrade;
        _uintRecords[node][KEY_MIN_LIQ] = minLiq;
        _textRecords[node][KEY_VIBAN] = viban;
        
        emit AstraUintRecordChanged(node, KEY_DRAWDOWN, drawdown);
        emit AstraUintRecordChanged(node, KEY_MAX_TRADE, maxTrade);
        emit AstraUintRecordChanged(node, KEY_MIN_LIQ, minLiq);
        emit AstraTextRecordChanged(node, KEY_VIBAN, viban);
    }

    // ============================================================
    // READ FUNCTIONS
    // ============================================================
    
    /**
     * @notice Get a uint256 record for an ENS node
     * @param node The ENS namehash of the name
     * @param key The record key
     * @return The uint256 value stored for the key
     */
    function uintRecord(
        bytes32 node,
        string calldata key
    ) external view returns (uint256) {
        return _uintRecords[node][key];
    }
    
    /**
     * @notice Get a text record for an ENS node
     * @param node The ENS namehash of the name
     * @param key The record key
     * @return The string value stored for the key
     */
    function textRecord(
        bytes32 node,
        string calldata key
    ) external view returns (string memory) {
        return _textRecords[node][key];
    }
    
    /**
     * @notice Get all policy records for an ENS node
     * @param node The ENS namehash of the name
     * @return drawdown Maximum drawdown in basis points
     * @return maxTrade Maximum trade size in wei
     * @return minLiq Minimum liquidity requirement in wei
     * @return viban Virtual IBAN identifier
     */
    function getAllRecords(bytes32 node) 
        external 
        view 
        returns (
            uint256 drawdown,
            uint256 maxTrade,
            uint256 minLiq,
            string memory viban
        ) 
    {
        drawdown = _uintRecords[node][KEY_DRAWDOWN];
        maxTrade = _uintRecords[node][KEY_MAX_TRADE];
        minLiq = _uintRecords[node][KEY_MIN_LIQ];
        viban = _textRecords[node][KEY_VIBAN];
    }

    // ============================================================
    // INTERNAL FUNCTIONS
    // ============================================================
    
    /**
     * @notice Check if the caller is authorized to modify the node
     * @dev Checks direct ownership and NameWrapper ownership
     * @param node The ENS namehash to check
     * @return True if caller is authorized
     */
    function _isAuthorised(bytes32 node) internal view returns (bool) {
        address owner = ens.owner(node);
        
        // If the owner is the NameWrapper, check wrapped ownership
        if (owner == address(nameWrapper) && address(nameWrapper) != address(0)) {
            owner = nameWrapper.ownerOf(uint256(node));
        }
        
        return owner == msg.sender;
    }
    
    /**
     * @notice Validate if a key is an allowed uint256 record key
     * @param key The key to validate
     * @return True if the key is valid
     */
    function _isValidUintKey(string memory key) internal pure returns (bool) {
        bytes32 keyHash = keccak256(bytes(key));
        return keyHash == keccak256(bytes(KEY_DRAWDOWN)) ||
               keyHash == keccak256(bytes(KEY_MAX_TRADE)) ||
               keyHash == keccak256(bytes(KEY_MIN_LIQ));
    }
    
    /**
     * @notice Validate if a key is an allowed text record key
     * @param key The key to validate
     * @return True if the key is valid
     */
    function _isValidTextKey(string memory key) internal pure returns (bool) {
        return keccak256(bytes(key)) == keccak256(bytes(KEY_VIBAN));
    }

    // ============================================================
    // EIP-165 INTERFACE SUPPORT
    // ============================================================
    
    /**
     * @notice Check if the contract supports an interface
     * @param interfaceId The interface identifier
     * @return True if the interface is supported
     */
    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0x01ffc9a7; // ERC-165
    }
}
