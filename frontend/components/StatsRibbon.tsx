'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
}

interface StatsRibbonProps {
  stats: StatItem[];
}

export default function StatsRibbon({ stats }: StatsRibbonProps) {
  return (
    <div className="w-full bg-terminal-panel border-b border-terminal-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-2 mb-1">
                  {Icon && <Icon className="w-4 h-4 text-accent-primary" />}
                  <span className="text-xs text-terminal-muted uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-mono font-bold text-terminal-text">
                    {stat.value}
                  </span>
                  {stat.change !== undefined && (
                    <span
                      className={`text-sm font-mono ${
                        stat.change >= 0 ? 'text-accent-success' : 'text-accent-error'
                      }`}
                    >
                      {stat.change >= 0 ? '+' : ''}
                      {stat.change}%
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
