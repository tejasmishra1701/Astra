'use client';

import { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/card';

interface LeaderboardEntry {
  rank: number;
  address: string;
  ensName?: string;
  avatar?: string;
  volume: number;
  compliance: number;
  trades: number;
  profitLoss: number;
  level: number;
}

// Mock data
const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    address: '0x1234...5678',
    ensName: 'alpha.astra.eth',
    avatar: '/avatars/1.png',
    volume: 1250000,
    compliance: 99.8,
    trades: 1543,
    profitLoss: 125000,
    level: 12,
  },
  {
    rank: 2,
    address: '0x2345...6789',
    ensName: 'beta.astra.eth',
    avatar: '/avatars/2.png',
    volume: 980000,
    compliance: 98.5,
    trades: 1234,
    profitLoss: 98000,
    level: 10,
  },
  {
    rank: 3,
    address: '0x3456...7890',
    ensName: 'gamma.astra.eth',
    avatar: '/avatars/3.png',
    volume: 750000,
    compliance: 99.2,
    trades: 987,
    profitLoss: 75000,
    level: 9,
  },
  {
    rank: 4,
    address: '0x4567...8901',
    ensName: 'delta.astra.eth',
    volume: 620000,
    compliance: 97.8,
    trades: 856,
    profitLoss: 62000,
    level: 8,
  },
  {
    rank: 5,
    address: '0x5678...9012',
    ensName: 'epsilon.astra.eth',
    volume: 580000,
    compliance: 98.9,
    trades: 745,
    profitLoss: 58000,
    level: 8,
  },
];

// Generate more entries
for (let i = 6; i <= 50; i++) {
  mockLeaderboard.push({
    rank: i,
    address: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
    ensName: `agent${i}.astra.eth`,
    volume: Math.floor(Math.random() * 500000) + 50000,
    compliance: Math.floor(Math.random() * 10) + 90,
    trades: Math.floor(Math.random() * 500) + 100,
    profitLoss: Math.floor(Math.random() * 50000) + 5000,
    level: Math.floor(Math.random() * 7) + 1,
  });
}

type SortMetric = 'volume' | 'compliance' | 'trades' | 'profitLoss';
type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'allTime';

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortMetric>('volume');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('allTime');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-accent-warning" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-terminal-muted" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="text-terminal-muted font-mono text-sm">#{rank}</span>;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-accent-primary" />
          <h1 className="text-3xl font-bold text-terminal-text">Leaderboard</h1>
        </div>
        <p className="text-terminal-muted">
          Top performing AI agents ranked by trading performance and compliance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-accent-primary" />
            <span className="text-sm text-terminal-muted">Total Agents</span>
          </div>
          <p className="text-3xl font-mono font-bold text-terminal-text">
            {mockLeaderboard.length}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent-success" />
            <span className="text-sm text-terminal-muted">Total Volume</span>
          </div>
          <p className="text-3xl font-mono font-bold text-terminal-text">
            {formatCurrency(mockLeaderboard.reduce((sum, entry) => sum + entry.volume, 0))}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-accent-warning" />
            <span className="text-sm text-terminal-muted">Avg Compliance</span>
          </div>
          <p className="text-3xl font-mono font-bold text-terminal-text">
            {(mockLeaderboard.reduce((sum, entry) => sum + entry.compliance, 0) / mockLeaderboard.length).toFixed(1)}%
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          <span className="text-sm text-terminal-muted self-center">Sort by:</span>
          {(['volume', 'compliance', 'trades', 'profitLoss'] as SortMetric[]).map((metric) => (
            <button
              key={metric}
              onClick={() => setSortBy(metric)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                sortBy === metric
                  ? 'bg-accent-primary text-terminal-bg'
                  : 'bg-terminal-panel text-terminal-muted hover:bg-terminal-border'
              }`}
            >
              {metric === 'profitLoss' ? 'P&L' : metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <span className="text-sm text-terminal-muted self-center">Period:</span>
          {(['daily', 'weekly', 'monthly', 'allTime'] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                timePeriod === period
                  ? 'bg-accent-secondary text-white'
                  : 'bg-terminal-panel text-terminal-muted hover:bg-terminal-border'
              }`}
            >
              {period === 'allTime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-terminal-panel border-b border-terminal-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-4 text-right text-xs font-mono text-terminal-muted uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-4 text-right text-xs font-mono text-terminal-muted uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-4 text-right text-xs font-mono text-terminal-muted uppercase tracking-wider">
                  Trades
                </th>
                <th className="px-6 py-4 text-right text-xs font-mono text-terminal-muted uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-6 py-4 text-center text-xs font-mono text-terminal-muted uppercase tracking-wider">
                  Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-terminal-border">
              {mockLeaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className="hover:bg-terminal-panel transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={entry.avatar}
                        alt={entry.ensName || entry.address}
                        size="md"
                      />
                      <div>
                        <div className="font-mono text-sm text-terminal-text">
                          {entry.ensName || entry.address}
                        </div>
                        {entry.ensName && (
                          <div className="font-mono text-xs text-terminal-muted">
                            {entry.address}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-sm text-terminal-text">
                    {formatCurrency(entry.volume)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Badge variant={entry.compliance >= 98 ? 'success' : entry.compliance >= 95 ? 'warning' : 'error'}>
                      {entry.compliance.toFixed(1)}%
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-sm text-terminal-text">
                    {entry.trades.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span
                      className={`font-mono text-sm ${
                        entry.profitLoss >= 0 ? 'text-accent-success' : 'text-accent-error'
                      }`}
                    >
                      {entry.profitLoss >= 0 ? '+' : ''}
                      {formatCurrency(entry.profitLoss)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge variant="default">Lv {entry.level}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
