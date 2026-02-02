# ASTRA - Product Context & Vision

> **A**gent **S**tandard **T**ransaction **R**ules & **A**uthorization

A high-frequency, policy-driven clearing terminal enabling autonomous AI agents to trade at institutional speeds while bound by decentralized safety "Charters" stored on ENS.

---

## Core Concept

ASTRA eliminates gas fees for individual trades by utilizing Yellow Network as a Layer-3 execution engine, enforcing compliance at the millisecond level through ENS-stored policy records.

---

## User Journey

### 1. Agent Birth (Setup)
- **Action:** User clicks "Create Agent"
- **Behind the Scenes:**
  - Create ENS subname (e.g., `bot01.tejas.eth`) - permanent agent ID
  - Deposit "fuel" (USDC/ETH) into Yellow Network ClearSync contract
  - This is the only high-gas transaction for a long time

### 2. Rulebook (Setting the Charter)
- **Action:** User configures sliders on Agent Passport page
- **Behind the Scenes:**
  - Multicall to ENS Resolver updating txt records (`ast_max_trade`, `ast_risk`)
  - Makes agent behavior transparent and decentralized
  - Anyone can verify bot rules on-chain

### 3. Ignition (Opening Session)
- **Action:** User clicks "Start Trading"
- **Behind the Scenes:**
  - Initialize Yellow Nitrolite App Session
  - Clearnode fetches ENS records
  - Session boundary established

### 4. Performance (Watching the Magic)
- **Action:** User views Clearing Terminal with Live Intent Stream
- **The "Wow" Factor:**
  - AI agent proposes 10-20 trades/second
  - "Verified by ENS" flash for successful trades
  - Unified Balance moving across Arbitrum/Base in real-time
  - No MetaMask popups

### 5. Tactical Change (Elite Move)
- **Action:** User modifies rules while agent is trading
- **Behind the Scenes:**
  - WebSocket listener / Wagmi watch hook detects ENS update
  - Terminal updates in real-time
  - Risky trades blocked immediately when Rulebook changes

---

## Phase Breakdown

### Phase 1: Core Infrastructure

**Identity & Rulebook (ENS)**
- Agent Passport: Each agent as ENS subname (`alpha.tejas.eth`)
- Static Guardrails via ENS Text Records:
  - `ast_drawdown` - Max percentage loss
  - `ast_min_liq` - Min pool liquidity requirement
  - `ast_allow_list` - Approved contract whitelist

**Execution Engine (Yellow Network)**
- Nitrolite Session: State-channel "tab" via Yellow ClearSync deposit
- Zero-Gas Trading: Off-chain trades, Clearnode fetches ENS rules
- Kill Switch: Emergency Settle button

---

### Phase 2: Advanced Intelligence & UX

**Advanced Policy Records**
| Record | Purpose |
|--------|---------|
| `ast_rate_limit` | Time-based throttling (trades/min) |
| `ast_sectors` | Sector locking (Stablecoins, AI tokens) |
| `ast_dynamic_slip` | Dynamic slippage tiering |

**Integrated Fuel System (x402 Model)**
- Pay-as-you-Clear: $0.001 per compliance check
- Unified Fuel Meter: Operational runway indicator

**Compliance Heatmap**
- Visual safety triggers on ClearingPulse
- Warning Yellow → Policy Red progression

---

### Phase 3: Full Implementation ("Sovereign Sandbox")

#### Page 1: Command Center
- Global ENS Search (inspect any agent's Charter)
- Intent Stream (real-time compliance results)
  - `APPROVED: "Verified against ast_max_trade (6ms)"`
  - `BLOCKED: "Violation of Sector Lock"`
- Unified Balance Card (Ethereum, Base, Polygon)

#### Page 2: Agent Passport
- Interactive Charter Editor (sliders → ENS Resolver)
- Subname Factory (`[name].astra.eth` registration)
- Write-to-Chain batch transaction

#### Page 3: Clearing Terminal
- Session Visualizer (3D pulse graph)
- Auto-Compounding Toggle (25% profit → deposit)
- vIBAN Settlement module (TradFi off-ramp)

#### Page 4: Analytics/Proof
- Gas Saved Ticker (live counter)
- Compliance Audit Logs (downloadable)
- Efficiency Gap Analytics (8ms vs 12s execution)

---

## ENS Policy Records (Complete)

| Record | Type | Description |
|--------|------|-------------|
| `ast_drawdown` | uint256 | Max loss % (basis points) |
| `ast_max_trade` | uint256 | Max trade size (wei) |
| `ast_min_liq` | uint256 | Min liquidity requirement |
| `ast_viban` | string | Virtual IBAN for fiat off-ramp |
| `ast_rate_limit` | uint256 | Trades per minute cap |
| `ast_sectors` | string | Allowed DeFi sectors (CSV) |
| `ast_dynamic_slip` | uint256 | Slippage tier threshold |
| `ast_allow_list` | string | Approved contract addresses |
| `ast_risk` | uint256 | Overall risk tolerance |

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Identity | ENS Subnames + AstraResolver |
| Execution | Yellow Network Nitrolite |
| Settlement | ClearSync State Channels |
| Frontend | Next.js + wagmi + RainbowKit |
| Backend | Node.js + Express + WebSocket |
| Theme | Quantum Midnight (Charcoal/Cyan/Orange) |

---

## Key Differentiators

1. **Decentralized Compliance** - Rules on-chain, not in private databases
2. **Millisecond Enforcement** - 8ms execution vs 12s block time
3. **Zero-Gas Trading** - All trades off-chain via state channels
4. **Real-Time Rule Changes** - Modify policies while agent is trading
5. **Transparent Audit** - Anyone can verify agent behavior on-chain
