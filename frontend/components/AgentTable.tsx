'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from './EmptyState';
import { SkeletonTable } from './ui/skeleton';

interface Agent {
  id: string;
  name: string;
  fdv: number;
  age: number;
  price: number;
  liquidity: number;
  volume24h: number;
  holders: number;
  compliance: number;
  status: 'active' | 'idle' | 'warning';
}

interface AgentTableProps {
  agents: Agent[];
  isLoading?: boolean;
  onAgentClick?: (agent: Agent) => void;
}

type SortKey = keyof Agent;
type SortDirection = 'asc' | 'desc';

export default function AgentTable({ agents, isLoading = false, onAgentClick }: AgentTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('volume24h');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedAgents = [...agents].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-accent-success';
      case 'idle':
        return 'bg-terminal-muted';
      case 'warning':
        return 'bg-accent-warning';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return 'text-accent-success';
    if (compliance >= 80) return 'text-accent-warning';
    return 'text-accent-error';
  };

  const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => (
    <span className={`ml-1 ${active ? 'text-accent-primary' : 'text-terminal-muted'}`}>
      {active ? (direction === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  if (isLoading) {
    return <SkeletonTable rows={5} />;
  }

  if (agents.length === 0) {
    return (
      <div className="bg-terminal-panel border border-terminal-border rounded-lg">
        <EmptyState
          icon="🤖"
          title="No Agents Found"
          description="You haven't deployed any trading agents yet. Create your first agent to get started."
          action={{
            label: 'Create Agent',
            onClick: () => {
              // Navigate to create agent page
              window.location.href = '/passport';
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-terminal-panel border border-terminal-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-terminal-border bg-terminal-bg">
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="text-xs font-mono text-terminal-muted uppercase tracking-wider hover:text-terminal-text transition-colors flex items-center"
                >
                  Agent Name
                  <SortIcon active={sortKey === 'name'} direction={sortDirection} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('fdv')}
                  className="text-xs font-mono text-terminal-muted uppercase tracking-wider hover:text-terminal-text transition-colors flex items-center"
                >
                  FDV
                  <SortIcon active={sortKey === 'fdv'} direction={sortDirection} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('age')}
                  className="text-xs font-mono text-terminal-muted uppercase tracking-wider hover:text-terminal-text transition-colors flex items-center"
                >
                  Age (Days)
                  <SortIcon active={sortKey === 'age'} direction={sortDirection} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('liquidity')}
                  className="text-xs font-mono text-terminal-muted uppercase tracking-wider hover:text-terminal-text transition-colors flex items-center"
                >
                  Liquidity
                  <SortIcon active={sortKey === 'liquidity'} direction={sortDirection} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('volume24h')}
                  className="text-xs font-mono text-terminal-muted uppercase tracking-wider hover:text-terminal-text transition-colors flex items-center"
                >
                  24h Volume
                  <SortIcon active={sortKey === 'volume24h'} direction={sortDirection} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('holders')}
                  className="text-xs font-mono text-terminal-muted uppercase tracking-wider hover:text-terminal-text transition-colors flex items-center"
                >
                  Holders
                  <SortIcon active={sortKey === 'holders'} direction={sortDirection} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('compliance')}
                  className="text-xs font-mono text-terminal-muted uppercase tracking-wider hover:text-terminal-text transition-colors flex items-center"
                >
                  Compliance
                  <SortIcon active={sortKey === 'compliance'} direction={sortDirection} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAgents.map((agent, index) => (
              <motion.tr
                key={agent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onAgentClick?.(agent)}
                className="border-b border-terminal-border hover:bg-terminal-bg transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-terminal-bg font-mono font-bold text-xs">
                      {agent.name.charAt(0)}
                    </div>
                    <span className="font-mono text-sm text-accent-primary">
                      {agent.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-sm text-terminal-text">
                  ${agent.fdv.toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-terminal-text">
                  {agent.age}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-terminal-text">
                  {agent.liquidity.toFixed(2)} ETH
                </td>
                <td className="px-4 py-3 font-mono text-sm text-accent-primary">
                  ${agent.volume24h.toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-terminal-text">
                  {agent.holders.toLocaleString()}
                </td>
                <td className={`px-4 py-3 font-mono text-sm font-bold ${getComplianceColor(agent.compliance)}`}>
                  {agent.compliance}%
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)} ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
                    <span className="text-xs font-mono text-terminal-muted uppercase">
                      {agent.status}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
