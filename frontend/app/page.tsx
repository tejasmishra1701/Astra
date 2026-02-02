"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  LayoutDashboard,
  DollarSign,
  X,
  Zap,
} from "lucide-react";
import IntentStream from "@/components/IntentStream";
import StatsRibbon from "@/components/StatsRibbon";
import LevelCard from "@/components/LevelCard";
import TopPerformers from "@/components/TopPerformers";
import AgentTable from "@/components/AgentTable";
import CreateAgentModal from "@/components/CreateAgentModal";
import { Button } from "@/components/ui/button";

// Mock balance data
const mockBalances = [
  {
    chain: "Ethereum",
    symbol: "ETH",
    balance: "2.4521",
    usd: "$4,890.42",
    color: "from-blue-500 to-purple-500",
  },
  {
    chain: "Base",
    symbol: "ETH",
    balance: "1.2000",
    usd: "$2,400.00",
    color: "from-blue-600 to-blue-400",
  },
  {
    chain: "Arbitrum",
    symbol: "ETH",
    balance: "0.8500",
    usd: "$1,700.00",
    color: "from-cyan-500 to-blue-500",
  },
  {
    chain: "Polygon",
    symbol: "MATIC",
    balance: "1,250.00",
    usd: "$875.00",
    color: "from-purple-600 to-purple-400",
  },
];

// Mock stats data
const mockStats = [
  { label: "Total Volume", value: "$1.2M", change: 12.5 },
  { label: "Active Agents", value: "24", change: 8.3 },
  { label: "Avg Compliance", value: "98.7%", change: 2.1 },
  { label: "Trades Today", value: "1,247", change: -3.2 },
];

// Mock agent data
const mockAgents = [
  {
    id: "1",
    name: "alpha.astra.eth",
    fdv: 1250000,
    age: 45,
    price: 2.45,
    liquidity: 12.5,
    volume24h: 450000,
    holders: 1250,
    compliance: 99.2,
    status: "active" as const,
  },
  {
    id: "2",
    name: "beta.astra.eth",
    fdv: 980000,
    age: 32,
    price: 1.89,
    liquidity: 8.3,
    volume24h: 320000,
    holders: 890,
    compliance: 97.8,
    status: "active" as const,
  },
  {
    id: "3",
    name: "gamma.astra.eth",
    fdv: 750000,
    age: 28,
    price: 1.52,
    liquidity: 6.7,
    volume24h: 280000,
    holders: 650,
    compliance: 98.5,
    status: "idle" as const,
  },
  {
    id: "4",
    name: "delta.astra.eth",
    fdv: 620000,
    age: 21,
    price: 1.23,
    liquidity: 5.2,
    volume24h: 195000,
    holders: 520,
    compliance: 96.3,
    status: "active" as const,
  },
  {
    id: "5",
    name: "epsilon.astra.eth",
    fdv: 580000,
    age: 18,
    price: 1.15,
    liquidity: 4.8,
    volume24h: 175000,
    holders: 480,
    compliance: 94.7,
    status: "warning" as const,
  },
];

// Mock top performers
const mockPerformers = [
  { rank: 1, name: "alpha.astra.eth", metric: "$450K volume" },
  { rank: 2, name: "beta.astra.eth", metric: "$320K volume" },
  { rank: 3, name: "gamma.astra.eth", metric: "$280K volume" },
  { rank: 4, name: "delta.astra.eth", metric: "$195K volume" },
  { rank: 5, name: "epsilon.astra.eth", metric: "$175K volume" },
];

export default function CommandCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<null | {
    name: string;
    policies: Record<string, string>;
  }>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      // Mock ENS lookup
      setSearchResult({
        name: searchQuery,
        policies: {
          ast_drawdown: "500",
          ast_max_trade: "2.0 ETH",
          ast_min_liq: "0.5 ETH",
          ast_viban: "DE89370400440532013000",
        },
      });
    }
  };

  const totalUSD = mockBalances.reduce(
    (sum, b) => sum + parseFloat(b.usd.replace(/[$,]/g, "")),
    0,
  );

  return (
    <div className="min-h-screen">
      {/* Global Stats Ribbon */}
      <StatsRibbon stats={mockStats} />

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 mt-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-8 h-8 text-accent-primary" />
              <h1 className="text-3xl font-bold text-terminal-text">
                Command Center
              </h1>
            </div>
            <p className="text-terminal-muted">
              Monitor your fleet of autonomous agents
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Create Agent Button */}
            <Button
              variant="default"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Agent
            </Button>

            {/* Global ENS Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted" />
                <input
                  type="text"
                  placeholder="Search agent.eth..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-terminal-panel border border-terminal-border rounded-lg text-sm w-64 focus:border-accent-primary focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-accent-primary text-terminal-bg rounded-lg font-semibold hover:bg-accent-primary/90 transition-all"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Search Result */}
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-terminal-panel border border-accent-primary/50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-accent-primary font-bold">
                {searchResult.name}
              </h3>
              <button
                onClick={() => setSearchResult(null)}
                className="text-terminal-muted hover:text-terminal-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(searchResult.policies).map(([key, value]) => (
                <div key={key} className="bg-terminal-bg rounded p-2">
                  <div className="text-xs text-terminal-muted font-mono">
                    {key}
                  </div>
                  <div className="text-sm text-terminal-text font-mono font-semibold">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Three-column Bento Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Unified Balance Card */}
          <div className="col-span-12 lg:col-span-3">
            <div className="relative bg-terminal-bg/90 backdrop-blur-sm border border-yellow-400/20 rounded-xl overflow-hidden shadow-terminal shadow-yellow-400/5 h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-terminal-panel via-terminal-panel to-yellow-400/5 border-b border-yellow-400/20">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-ens-500 shadow-lg shadow-yellow-400/20">
                    <DollarSign className="w-4 h-4 text-terminal-bg" />
                  </div>
                  <span className="text-sm font-mono text-yellow-400 uppercase tracking-widest font-semibold">
                    Unified Balance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent-success animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Total Balance */}
                <div className="mb-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-ens-400"
                  >
                    $
                    {totalUSD.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </motion.div>
                  <div className="text-xs text-terminal-muted mt-1 font-mono uppercase tracking-wider">
                    Total across all chains
                  </div>
                </div>

                {/* Chain Breakdown */}
                <div className="space-y-2">
                  {mockBalances.map((b, i) => (
                    <motion.div
                      key={b.chain}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex items-center justify-between p-3 rounded-lg bg-terminal-panel/50 border border-transparent hover:border-yellow-400/20 hover:bg-yellow-400/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                        >
                          <span className="text-sm font-bold text-white">
                            {b.symbol[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-terminal-text group-hover:text-yellow-400 transition-colors">
                            {b.chain}
                          </div>
                          <div className="text-xs text-terminal-muted font-mono">
                            {b.balance} {b.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-ens-400 font-mono">
                        {b.usd}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ClearSync Deposit */}
                <div className="mt-5 pt-4 border-t border-yellow-400/10">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent-success/5 border border-accent-success/20">
                    <div>
                      <div className="text-xs text-terminal-muted font-mono uppercase">
                        ClearSync Deposit
                      </div>
                      <div className="text-lg font-bold text-accent-success">
                        1.5 ETH
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent-success/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-accent-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 px-1">
                    <div className="text-xs text-terminal-muted font-mono">
                      Session Runway
                    </div>
                    <div className="text-sm font-mono text-yellow-400 font-semibold">
                      ~45,000 trades
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/10 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ens-500/5 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Center: Agent Feed */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Intent Stream */}
            <div className="h-[300px]">
              <IntentStream />
            </div>

            {/* Agent Table */}
            <AgentTable agents={mockAgents} />
          </div>

          {/* Right: Gamification HUD */}
          <div className="col-span-12 lg:col-span-3 space-y-6 lg:sticky lg:top-20">
            <LevelCard
              level={4}
              currentXP={3250}
              nextLevelXP={5000}
              username="Trader"
            />
            <TopPerformers performers={mockPerformers} />
          </div>
        </div>
      </div>

      {/* Create Agent Modal */}
      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={(agentName) => {
          console.log("Agent created:", agentName);
          // TODO: Refresh agent list
        }}
      />
    </div>
  );
}
