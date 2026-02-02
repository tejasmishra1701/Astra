'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface Performer {
  rank: number;
  name: string;
  metric: string;
  avatar?: string;
}

interface TopPerformersProps {
  performers: Performer[];
  title?: string;
}

export default function TopPerformers({ performers, title = 'Top Performers' }: TopPerformersProps) {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-accent-warning" />;
      case 2:
        return <Medal className="w-4 h-4 text-terminal-muted" />;
      case 3:
        return <Award className="w-4 h-4 text-orange-600" />;
      default:
        return <span className="text-xs font-mono">#{rank}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {performers.map((performer, index) => (
            <motion.div
              key={performer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-terminal-bg transition-colors"
            >
              {/* Rank Badge */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terminal-bg border border-terminal-border flex items-center justify-center font-bold">
                {getRankBadge(performer.rank)}
              </div>

              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-terminal-bg font-mono font-bold">
                {performer.avatar || performer.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-mono text-terminal-text truncate">
                  {performer.name}
                </div>
                <div className="text-xs font-mono text-terminal-muted">
                  {performer.metric}
                </div>
              </div>

              {/* Indicator */}
              {performer.rank <= 3 && (
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${
                    performer.rank === 1 ? 'bg-accent-success' :
                    performer.rank === 2 ? 'bg-accent-primary' :
                    'bg-accent-secondary'
                  } animate-pulse`} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
