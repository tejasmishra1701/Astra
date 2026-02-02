'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import IntentStream from '@/components/IntentStream';

// Mock balance data
const mockBalances = [
  { chain: 'Ethereum', symbol: 'ETH', balance: '2.4521', usd: '$4,890.42', icon: '⟠' },
  { chain: 'Base', symbol: 'ETH', balance: '1.2000', usd: '$2,400.00', icon: '🔵' },
  { chain: 'Arbitrum', symbol: 'ETH', balance: '0.8500', usd: '$1,700.00', icon: '🔷' },
  { chain: 'Polygon', symbol: 'MATIC', balance: '1,250.00', usd: '$875.00', icon: '💜' },
];

export default function CommandCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<null | { name: string; policies: Record<string, string> }>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      // Mock ENS lookup
      setSearchResult({
        name: searchQuery,
        policies: {
          ast_drawdown: '500',
          ast_max_trade: '2.0 ETH',
          ast_min_liq: '0.5 ETH',
          ast_viban: 'DE89370400440532013000',
        },
      });
    }
  };

  const totalUSD = mockBalances.reduce((sum, b) => sum + parseFloat(b.usd.replace(/[$,]/g, '')), 0);

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono text-accent-primary flex items-center gap-3">
            <span className="text-4xl">🎛️</span>
            Command Center
          </h1>
          <p className="text-terminal-muted font-mono mt-1">
            Monitor your fleet of autonomous agents
          </p>
        </div>

        {/* Global ENS Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search any agent.eth..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-terminal-panel border border-terminal-border rounded-lg font-mono text-sm w-64 focus:border-accent-primary focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-accent-primary text-terminal-bg rounded-lg font-mono font-bold hover:scale-105 transition-transform"
          >
            Inspect
          </button>
        </form>
      </div>

      {/* Search Result */}
      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-terminal-panel border border-accent-primary/50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mono text-accent-primary font-bold">{searchResult.name}</h3>
            <button
              onClick={() => setSearchResult(null)}
              className="text-terminal-muted hover:text-terminal-text"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(searchResult.policies).map(([key, value]) => (
              <div key={key} className="bg-terminal-bg rounded p-2">
                <div className="text-xs text-terminal-muted font-mono">{key}</div>
                <div className="text-sm text-terminal-text font-mono font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Unified Balance Card */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-terminal-panel border border-terminal-border rounded-lg p-6 shadow-terminal h-full">
            <h2 className="text-lg font-mono font-bold text-terminal-text mb-4 flex items-center gap-2">
              💰 Unified Balance
            </h2>

            {/* Total */}
            <div className="mb-6">
              <div className="text-3xl font-mono font-bold text-accent-primary">
                ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-terminal-muted font-mono">Total across all chains</div>
            </div>

            {/* Chain Breakdown */}
            <div className="space-y-3">
              {mockBalances.map((b, i) => (
                <motion.div
                  key={b.chain}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between py-2 border-b border-terminal-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <div className="text-sm font-mono text-terminal-text">{b.chain}</div>
                      <div className="text-xs text-terminal-muted font-mono">
                        {b.balance} {b.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-mono text-accent-secondary">{b.usd}</div>
                </motion.div>
              ))}
            </div>

            {/* ClearSync Deposit */}
            <div className="mt-6 pt-4 border-t border-terminal-border">
              <div className="flex items-center justify-between">
                <div className="text-sm font-mono text-terminal-muted">ClearSync Deposit</div>
                <div className="text-accent-success font-mono font-bold">1.5 ETH</div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="text-sm font-mono text-terminal-muted">Session Runway</div>
                <div className="text-accent-primary font-mono text-sm">~45,000 trades</div>
              </div>
            </div>
          </div>
        </div>

        {/* Intent Stream */}
        <div className="col-span-12 lg:col-span-8 h-[500px]">
          <IntentStream />
        </div>
      </div>

      {/* Active Agents */}
      <div className="bg-terminal-panel border border-terminal-border rounded-lg p-6">
        <h2 className="text-lg font-mono font-bold text-terminal-text mb-4 flex items-center gap-2">
          🤖 Active Agents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['alpha.astra.eth', 'beta.astra.eth', 'gamma.astra.eth'].map((agent, i) => (
            <div
              key={agent}
              className="bg-terminal-bg border border-terminal-border rounded-lg p-4 hover:border-accent-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-accent-primary">{agent}</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-accent-success animate-pulse' : 'bg-terminal-muted'}`}></div>
                  <span className="text-xs text-terminal-muted">{i === 0 ? 'LIVE' : 'IDLE'}</span>
                </div>
              </div>
              <div className="text-sm text-terminal-muted font-mono">
                {i === 0 ? '12 trades/min' : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
