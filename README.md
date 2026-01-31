# ASTRA

> **A**gent **S**tandard **T**ransaction **R**ules & **A**uthorization

A high-frequency policy-clearing terminal built on Yellow Network and ENS for decentralized agent transaction governance.

---

## Overview

ASTRA provides a decentralized infrastructure for autonomous trading agents to register and enforce their operational policies on-chain. Using ENS subnames as agent identifiers, ASTRA enables:

- **Policy Registration**: Agents register trading rules (drawdown limits, trade sizes, liquidity thresholds) via custom ENS resolver records
- **Yellow Network Integration**: Interoperability layer for cross-chain agent communication and state-channel settlements
- **Virtual IBAN (VIBAN)**: Off-chain identity mapping for fiat-crypto gateway integration

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      ASTRA TERMINAL                         │
├──────────────────┬──────────────────┬──────────────────────┤
│    /contracts    │     /backend     │      /frontend       │
│  (Foundry/Sol)   │   (Engineer A)   │    (Engineer C)      │
├──────────────────┴──────────────────┴──────────────────────┤
│                    AstraResolver.sol                        │
│        Custom ENS Resolver for Agent Policy Records         │
│                                                             │
│  Records:                                                   │
│  ├── ast_drawdown   (uint256) - Max drawdown %             │
│  ├── ast_max_trade  (uint256) - Max trade size             │
│  ├── ast_min_liq    (uint256) - Min liquidity requirement  │
│  └── ast_viban      (string)  - Virtual IBAN identifier    │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Node.js](https://nodejs.org/) >= 18
- [Git](https://git-scm.com/)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/astra.git
cd astra

# Install contract dependencies
cd contracts
forge install

# Build contracts
forge build
```

---

## Project Structure

```
astra/
├── contracts/          # Solidity smart contracts (Foundry)
│   ├── src/           
│   │   └── AstraResolver.sol
│   ├── test/          
│   └── foundry.toml   
├── backend/            # Backend services (Engineer A)
├── frontend/           # Web application (Engineer C)
├── .gitignore         
└── README.md          
```

---

## License

MIT
