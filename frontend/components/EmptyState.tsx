'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Users, Activity, Search, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  icon?: string | ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: 'default' | 'agents' | 'trades' | 'search' | 'error';
}

const variantIcons = {
  default: <FileQuestion className="w-16 h-16" />,
  agents: <Users className="w-16 h-16" />,
  trades: <Activity className="w-16 h-16" />,
  search: <Search className="w-16 h-16" />,
  error: <AlertCircle className="w-16 h-16" />,
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
  variant = 'default',
}: EmptyStateProps) {
  const defaultIcon = icon || variantIcons[variant] || '📭';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div className="text-6xl mb-6 opacity-40 text-terminal-text-tertiary">
        {typeof defaultIcon === 'string' ? defaultIcon : defaultIcon}
      </div>
      <h3 className="text-xl font-mono font-bold text-terminal-text mb-3">
        {title}
      </h3>
      {description && (
        <p className="text-sm font-mono text-terminal-muted max-w-md mb-8 leading-relaxed">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-accent-primary text-terminal-bg font-mono font-bold rounded-lg shadow-neon-cyan hover:scale-105 transition-transform"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

// Preset empty states for common scenarios
export function EmptyAgentList({ onCreateAgent }: { onCreateAgent?: () => void }) {
  return (
    <EmptyState
      variant="agents"
      title="No agents found"
      description="Create your first AI trading agent to get started with ASTRA."
      action={
        onCreateAgent
          ? {
              label: 'Create Your First Agent',
              onClick: onCreateAgent,
            }
          : undefined
      }
    />
  );
}

export function EmptyTradeHistory() {
  return (
    <EmptyState
      variant="trades"
      title="No trades yet"
      description="Start trading to see your transaction history here."
    />
  );
}

export function EmptySearchResults({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      action={
        onClearFilters
          ? {
              label: 'Clear Filters',
              onClick: onClearFilters,
            }
          : undefined
      }
    />
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      variant="error"
      title="Something went wrong"
      description="We encountered an error loading this data. Please try again."
      action={
        onRetry
          ? {
              label: 'Try Again',
              onClick: onRetry,
            }
          : undefined
      }
    />
  );
}
