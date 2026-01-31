# Contributing to ASTRA Frontend

Welcome, Engineer C! This guide will help you integrate with the deployed AstraResolver contract and complete the ASTRA terminal UI.

---

## 🎯 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Finding the AstraResolver Contract Address

The `AstraResolver` contract address is found in **one of two places**:

### Option A: From Foundry Deployment Output

After the contract is deployed via Foundry, the address will be in the deployment logs:

```bash
cd ../contracts
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
```

**Look for output:**
```
== Logs ==
AstraResolver deployed at: 0x...
```

### Option B: From Deployment Artifacts

Foundry saves deployment data to `broadcast/` directory:

```bash
cd ../contracts/broadcast/Deploy.s.sol/<CHAIN_ID>/run-latest.json
```

Search for `"contractName": "AstraResolver"` and copy the `"contractAddress"` value.

### 📍 Where to Use the Address

**Configuration File: `frontend/lib/contracts.ts`** (create this)

```typescript
export const ASTRA_RESOLVER_ADDRESS = '0x...' as const;

export const ASTRA_RESOLVER_ABI = [
  // Copy from: ../contracts/out/AstraResolver.sol/AstraResolver.json
  "function uintRecord(bytes32 node, string key) external view returns (uint256)",
  "function textRecord(bytes32 node, string key) external view returns (string)",
  "function getAllRecords(bytes32 node) external view returns (uint256 drawdown, uint256 maxTrade, uint256 minLiq, string viban)",
  "function setUintRecord(bytes32 node, string key, uint256 value) external",
  "function setTextRecord(bytes32 node, string key, string value) external",
  "function setAllRecords(bytes32 node, uint256 drawdown, uint256 maxTrade, uint256 minLiq, string viban) external"
] as const;
```

---

## 📦 Smart Contract Integration

### Extracting the Full ABI

```bash
cd ../contracts
cat out/AstraResolver.sol/AstraResolver.json | jq '.abi' > ../frontend/lib/AstraResolver.abi.json
```

Then import in your components:
```typescript
import AstraResolverABI from '@/lib/AstraResolver.abi.json';
```

### Using wagmi Hooks

**Example: Reading Policy Records**

```typescript
'use client';

import { useReadContract, useAccount } from 'wagmi';
import { namehash } from 'viem';
import { ASTRA_RESOLVER_ADDRESS, ASTRA_RESOLVER_ABI } from '@/lib/contracts';

export function usePolicyRecords(ensName: string) {
  const node = namehash(ensName); // e.g., "agent1.astra.eth"
  
  const { data, isLoading, error } = useReadContract({
    address: ASTRA_RESOLVER_ADDRESS,
    abi: ASTRA_RESOLVER_ABI,
    functionName: 'getAllRecords',
    args: [node],
  });
  
  if (!data) return null;
  
  const [drawdown, maxTrade, minLiq, viban] = data;
  
  return {
    drawdown: Number(drawdown),
    maxTrade,
    minLiq,
    viban,
  };
}
```

**Example: Writing Policy Records**

```typescript
'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { namehash, parseEther } from 'viem';
import { ASTRA_RESOLVER_ADDRESS, ASTRA_RESOLVER_ABI } from '@/lib/contracts';

export function useUpdatePolicy() {
  const { writeContract, data: hash } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  
  const updatePolicy = async (
    ensName: string,
    drawdown: number,
    maxTrade: string, // in ETH
    minLiq: string,   // in ETH
    viban: string
  ) => {
    const node = namehash(ensName);
    
    writeContract({
      address: ASTRA_RESOLVER_ADDRESS,
      abi: ASTRA_RESOLVER_ABI,
      functionName: 'setAllRecords',
      args: [
        node,
        BigInt(drawdown),
        parseEther(maxTrade),
        parseEther(minLiq),
        viban,
      ],
    });
  };
  
  return { updatePolicy, isConfirming, isSuccess };
}
```

---

## 🎨 Component Architecture

### Existing Placeholder Components

Three components have been scaffolded for you:

#### 1. **IntentStream.tsx** - Yellow Network Intent Feed
- **Location:** `components/IntentStream.tsx`
- **Purpose:** Display real-time trading intents from Yellow Network
- **TODO for you:**
  - Replace mock data with actual Yellow WebSocket integration
  - Connect to backend at `ws://localhost:3000` or Yellow Network directly
  - Add filtering/sorting controls

#### 2. **PolicyPassport.tsx** - Agent Policy Configuration
- **Location:** `components/PolicyPassport.tsx`
- **Purpose:** Form with sliders for `ast_drawdown`, `ast_max_trade`, `ast_min_liq`
- **TODO for you:**
  - Wire up the `handleSave()` function to call `useUpdatePolicy()` hook
  - Add RainbowKit wallet connection requirement
  - Fetch current policy values on component mount
  - Add ENS name input field

#### 3. **ClearingPulse.tsx** - Trade Clearing Visualizer
- **Location:** `components/ClearingPulse.tsx`
- **Purpose:** Animated visualization of clearing status
- **TODO for you:**
  - Connect to backend WebSocket for real clearing events
  - Add sound effects on status changes (optional)
  - Display detailed trade info on hover

### Creating the Main Dashboard

**Recommended: `app/page.tsx`**

```typescript
import IntentStream from '@/components/IntentStream';
import PolicyPassport from '@/components/PolicyPassport';
import ClearingPulse from '@/components/ClearingPulse';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-terminal-bg p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-mono text-accent-primary">
          ASTRA Terminal
        </h1>
        <p className="text-terminal-muted font-mono mt-2">
          High-Frequency Policy-Clearing Terminal
        </p>
      </header>
      
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        <div className="col-span-4 h-full">
          <IntentStream />
        </div>
        <div className="col-span-5 h-full">
          <PolicyPassport />
        </div>
        <div className="col-span-3 h-full">
          <ClearingPulse />
        </div>
      </div>
    </div>
  );
}
```

---

## 🌐 Web3 Provider Setup

### RainbowKit + Wagmi Configuration

**Create: `app/providers.tsx`**

```typescript
'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia, mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'ASTRA Terminal',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from cloud.walletconnect.com
  chains: [sepolia, mainnet],
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

**Update: `app/layout.tsx`**

```typescript
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## 🎨 Quantum Midnight Theme Usage

The custom theme is defined in `tailwind.config.ts`. Use these classes:

### Colors
- **Background:** `bg-terminal-bg`, `bg-terminal-panel`
- **Borders:** `border-terminal-border`
- **Text:** `text-terminal-text`, `text-terminal-muted`
- **Accents:** `text-accent-primary` (cyan), `text-accent-secondary` (orange)

### Effects
- **Shadows:** `shadow-neon-cyan`, `shadow-neon-orange`
- **Animations:** `animate-pulse-slow`, `animate-glow`, `animate-flicker`

### Example
```tsx
<div className="bg-terminal-panel border border-terminal-border rounded-lg p-6 shadow-terminal">
  <h2 className="text-accent-primary font-mono animate-glow">
    ASTRA TERMINAL
  </h2>
</div>
```

---

## 🔌 Backend Integration

The backend server runs on `http://localhost:3000` (when started via `npm run dev` in `/backend`).

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check backend status |
| `/check-compliance` | POST | Manual compliance check |
| `/policy/:ensNode` | GET | Fetch policy for agent |

### WebSocket (Future)

For real-time updates, consider adding Socket.io or native WebSocket:

```typescript
// Example WebSocket client
const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'compliance_check') {
    // Update ClearingPulse status
  }
};
```

---

## 📝 Next Steps for Engineer C

1. ✅ **Deploy AstraResolver** (if not done)
   ```bash
   cd ../contracts
   forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
   ```

2. ✅ **Copy Contract Address** to `frontend/lib/contracts.ts`

3. ✅ **Setup RainbowKit** providers in `app/providers.tsx`

4. ✅ **Wire PolicyPassport** to write to AstraResolver

5. ✅ **Connect IntentStream** to Yellow Network or backend WebSocket

6. ✅ **Add Wallet Connect** button to navbar

7. ✅ **Test End-to-End** - Set policy → Trigger trade → Watch clearing visualizer

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Environment Variables

Set in Vercel dashboard or `.env.local`:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ASTRA_RESOLVER_ADDRESS=0x...
NEXT_PUBLIC_BACKEND_URL=https://your-backend.railway.app
```

---

## 📚 Useful Resources

- **Wagmi Docs:** https://wagmi.sh
- **RainbowKit:** https://rainbowkit.com
- **Viem:** https://viem.sh
- **Framer Motion:** https://framer.com/motion
- **Tailwind CSS:** https://tailwindcss.com

---

## 🆘 Need Help?

- Check `../backend/README.md` for backend API details
- Review `../contracts/test/AstraResolver.t.sol` for contract behavior
- See deployed contract on Etherscan: `https://sepolia.etherscan.io/address/0x...`

---

Happy coding! 🚀✨
