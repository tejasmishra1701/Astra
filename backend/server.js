/**
 * ASTRA Agent Brain - Backend Server
 * 
 * This server integrates with Yellow Network Sandbox and enforces
 * on-chain policy compliance via AstraResolver ENS records.
 * 
 * @author ASTRA Engineering Team
 */

require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');

// ============================================================
// CONFIGURATION
// ============================================================

const PORT = process.env.PORT || 3001;
const RPC_URL = process.env.RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY';
const YELLOW_SANDBOX_WS = process.env.YELLOW_WS || 'wss://sandbox.yellownetwork.io/ws';
const ASTRA_RESOLVER_ADDRESS = process.env.ASTRA_RESOLVER_ADDRESS || '0x0000000000000000000000000000000000000000'; // Deploy address

// AstraResolver ABI - Auto-generated from forge build
// Copy from: contracts/out/AstraResolver.sol/AstraResolver.json
const ASTRA_RESOLVER_ABI = [
    "function uintRecord(bytes32 node, string key) external view returns (uint256)",
    "function textRecord(bytes32 node, string key) external view returns (string)",
    "function getAllRecords(bytes32 node) external view returns (uint256 drawdown, uint256 maxTrade, uint256 minLiq, string viban)"
];

// ============================================================
// ETHERS PROVIDER & CONTRACT SETUP
// ============================================================

const provider = new ethers.JsonRpcProvider(RPC_URL);
const astraResolver = new ethers.Contract(
    ASTRA_RESOLVER_ADDRESS,
    ASTRA_RESOLVER_ABI,
    provider
);

// ============================================================
// YELLOW NETWORK INTEGRATION
// ============================================================

let yellowClient = null;

/**
 * Connect to Yellow Network Sandbox WebSocket
 */
async function connectToYellow() {
    try {
        // Note: @erc7824/nitrolite is a placeholder - actual Yellow SDK may differ
        // This demonstrates the integration pattern
        console.log(`[Yellow] Connecting to ${YELLOW_SANDBOX_WS}...`);

        // Mock WebSocket connection (replace with actual Yellow SDK)
        yellowClient = {
            connected: true,
            send: (msg) => console.log('[Yellow] Sent:', msg),
            on: (event, handler) => console.log(`[Yellow] Listening for ${event}`)
        };

        console.log('[Yellow] ✅ Connected to Yellow Network Sandbox');

        // Subscribe to trade execution events
        yellowClient.on('trade', handleYellowTrade);
        yellowClient.on('error', (err) => console.error('[Yellow] Error:', err));

    } catch (error) {
        console.error('[Yellow] Connection failed:', error.message);
        throw error;
    }
}

/**
 * Handle incoming trade events from Yellow Network
 */
function handleYellowTrade(trade) {
    console.log('[Yellow] Trade received:', trade);
    // Process trade through compliance checker
    complianceChecker(trade.agentNode, trade);
}

// ============================================================
// COMPLIANCE CHECKER
// ============================================================

/**
 * Fetch and validate agent policy records from AstraResolver
 * 
 * @param {string} ensNode - ENS namehash of the agent (e.g., namehash("agent1.astra.eth"))
 * @param {object} trade - Trade intent object
 * @returns {Promise<object>} Compliance result
 */
async function complianceChecker(ensNode, trade) {
    try {
        console.log(`[Compliance] Checking node: ${ensNode}`);

        // Fetch all policy records from AstraResolver
        const [drawdown, maxTrade, minLiq, viban] = await astraResolver.getAllRecords(ensNode);

        console.log('[Compliance] Policy Records:', {
            drawdown: drawdown.toString(),
            maxTrade: ethers.formatEther(maxTrade),
            minLiq: ethers.formatEther(minLiq),
            viban: viban
        });

        // Compliance checks
        const checks = {
            maxTradeValid: trade.amount <= maxTrade,
            liquidityValid: trade.liquidity >= minLiq,
            vibanPresent: viban.length > 0
        };

        const isCompliant = Object.values(checks).every(check => check === true);

        if (isCompliant) {
            console.log('[Compliance] ✅ PASS - Trade is compliant');
        } else {
            console.warn('[Compliance] ❌ FAIL - Policy violation detected:', checks);
        }

        return {
            compliant: isCompliant,
            checks,
            policy: { drawdown, maxTrade, minLiq, viban }
        };

    } catch (error) {
        console.error('[Compliance] Error fetching policy:', error.message);
        return {
            compliant: false,
            error: error.message
        };
    }
}

// ============================================================
// MOCK TRADE STREAM (FOR TESTING)
// ============================================================

/**
 * Generate mock trade intents every 500ms for testing
 */
function mockTradeStream() {
    let tradeCounter = 0;

    setInterval(() => {
        tradeCounter++;

        // Mock ENS node (replace with actual namehash)
        const mockNode = ethers.namehash('agent1.astra.eth');

        const mockTrade = {
            id: `trade_${tradeCounter}`,
            agentNode: mockNode,
            amount: ethers.parseEther((Math.random() * 2).toFixed(4)), // 0-2 ETH
            liquidity: ethers.parseEther((Math.random() * 1).toFixed(4)), // 0-1 ETH
            pair: 'ETH/USDT',
            timestamp: Date.now()
        };

        console.log(`\n[MockStream] Trade #${tradeCounter}:`, {
            amount: ethers.formatEther(mockTrade.amount) + ' ETH',
            liquidity: ethers.formatEther(mockTrade.liquidity) + ' ETH'
        });

        // Run compliance check
        complianceChecker(mockNode, mockTrade);

    }, 500); // Every 500ms
}

// ============================================================
// EXPRESS API SERVER
// ============================================================

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        yellowConnected: yellowClient?.connected || false,
        resolver: ASTRA_RESOLVER_ADDRESS
    });
});

// Manual compliance check endpoint
app.post('/check-compliance', async (req, res) => {
    const { ensNode, trade } = req.body;

    if (!ensNode || !trade) {
        return res.status(400).json({ error: 'Missing ensNode or trade data' });
    }

    const result = await complianceChecker(ensNode, trade);
    res.json(result);
});

// Get policy for a specific agent
app.get('/policy/:ensNode', async (req, res) => {
    try {
        const { ensNode } = req.params;
        const [drawdown, maxTrade, minLiq, viban] = await astraResolver.getAllRecords(ensNode);

        res.json({
            node: ensNode,
            policy: {
                drawdown: drawdown.toString(),
                maxTrade: ethers.formatEther(maxTrade),
                minLiq: ethers.formatEther(minLiq),
                viban
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================================
// SERVER STARTUP
// ============================================================

async function start() {
    try {
        console.log('🚀 ASTRA Agent Brain starting...\n');

        // Connect to Yellow Network
        await connectToYellow();

        // Start mock trade stream if in dev mode
        if (process.env.NODE_ENV === 'development') {
            console.log('[MockStream] Starting mock trade generator...\n');
            mockTradeStream();
        }

        // Start Express server
        app.listen(PORT, () => {
            console.log(`\n✅ Server running on http://localhost:${PORT}`);
            console.log(`   Health: http://localhost:${PORT}/health`);
            console.log(`   Policy: http://localhost:${PORT}/policy/:ensNode\n`);
        });

    } catch (error) {
        console.error('❌ Startup failed:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n[Shutdown] Closing connections...');
    if (yellowClient) {
        // yellowClient.close();
    }
    process.exit(0);
});

// Start the server
start();
