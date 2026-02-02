'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface LevelCardProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  username?: string;
}

export default function LevelCard({ level, currentXP, nextLevelXP, username = 'Agent' }: LevelCardProps) {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <Card className="bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 border-[#667eea]/30">
      <CardHeader>
        <CardTitle className="text-accent-primary">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level Display */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block"
          >
            <div className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2]">
              Level {level}
            </div>
          </motion.div>
          <p className="text-sm font-mono text-terminal-muted mt-2">{username}</p>
        </div>

        {/* XP Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-mono">
            <span className="text-terminal-muted">XP</span>
            <span className="text-terminal-text">
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}
            </span>
          </div>
          <div className="h-3 bg-terminal-bg rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"
            />
          </div>
          <p className="text-xs font-mono text-terminal-muted text-right">
            {(nextLevelXP - currentXP).toLocaleString()} XP to next level
          </p>
        </div>

        {/* Curved Path Visualization */}
        <div className="relative h-24 flex items-center justify-center">
          <svg viewBox="0 0 300 80" className="w-full h-full">
            {/* Background path */}
            <path
              d="M 20 60 Q 75 20, 150 40 T 280 60"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            {/* Progress path */}
            <motion.path
              d="M 20 60 Q 75 20, 150 40 T 280 60"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="400"
              initial={{ strokeDashoffset: 400 }}
              animate={{ strokeDashoffset: 400 - (progress / 100) * 400 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
            {/* Level nodes */}
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 20 + i * 65;
              const y = i % 2 === 0 ? 60 : 40;
              const isCompleted = i < level;
              const isCurrent = i === level;

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill={isCompleted ? '#667eea' : isCurrent ? '#764ba2' : 'rgba(255,255,255,0.1)'}
                    stroke={isCurrent ? '#764ba2' : 'transparent'}
                    strokeWidth="3"
                  />
                  {isCurrent && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="none"
                      stroke="#764ba2"
                      strokeWidth="2"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
