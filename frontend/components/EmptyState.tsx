'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: string | ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon = '📭',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
    >
      <div className="text-6xl mb-4 opacity-50">
        {typeof icon === 'string' ? icon : icon}
      </div>
      <h3 className="text-xl font-mono font-bold text-terminal-text mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm font-mono text-terminal-muted max-w-md mb-6">
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
