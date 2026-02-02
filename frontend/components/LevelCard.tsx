"use client";

import { motion } from "framer-motion";
import { Zap, Star, TrendingUp } from "lucide-react";

interface LevelCardProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  username?: string;
}

export default function LevelCard({
  level,
  currentXP,
  nextLevelXP,
  username = "Trader",
}: LevelCardProps) {
  const progress = (currentXP / nextLevelXP) * 100;
  const xpToNext = nextLevelXP - currentXP;

  return (
    <div className="relative bg-terminal-bg/90 backdrop-blur-sm border border-yellow-400/20 rounded-xl overflow-hidden shadow-terminal shadow-yellow-400/5">
      {/* Header with gradient */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-terminal-panel via-terminal-panel to-yellow-400/5 border-b border-yellow-400/20">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-400/10">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
          </div>
          <span className="text-sm font-mono text-yellow-400 uppercase tracking-widest font-semibold">
            Your Progress
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-yellow-400 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Level Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Level Badge */}
            <motion.div
              initial={{ scale: 0.9, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-ens-500 flex items-center justify-center shadow-lg shadow-yellow-400/30">
                <span className="text-2xl font-mono font-bold text-terminal-bg">
                  {level}
                </span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400 to-ens-500 blur-xl opacity-40"
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-ens-400"
              >
                Level {level}
              </motion.div>
              <p className="text-sm font-mono text-terminal-muted flex items-center gap-1.5">
                <Star className="w-3 h-3 text-yellow-400" />
                {username}
              </p>
            </div>
          </div>

          {/* XP Badge */}
          <div className="text-right">
            <div className="text-xs font-mono text-terminal-muted mb-1">
              TOTAL XP
            </div>
            <div className="text-xl font-mono font-bold text-yellow-400">
              {currentXP.toLocaleString()}
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-terminal-muted flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              Progress to Level {level + 1}
            </span>
            <span className="text-terminal-text">
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}
            </span>
          </div>

          {/* Progress bar container */}
          <div className="relative h-4 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border">
            {/* Animated shimmer background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent animate-shimmer"></div>

            {/* Progress fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-ens-500 rounded-full"
            >
              {/* Glow effect on progress */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-ens-500 blur-sm opacity-50"></div>
            </motion.div>

            {/* Percentage indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-mono font-bold text-white drop-shadow-lg">
                {progress.toFixed(0)}%
              </span>
            </div>
          </div>

          <p className="text-xs font-mono text-terminal-muted text-right flex items-center justify-end gap-1">
            <TrendingUp className="w-3 h-3 text-ens-400" />
            <span className="text-ens-400 font-semibold">
              {xpToNext.toLocaleString()}
            </span>{" "}
            XP to next level
          </p>
        </div>

        {/* Level Journey Visualization */}
        <div className="relative pt-2">
          <div className="flex justify-between items-center">
            {[0, 1, 2, 3, 4].map((i) => {
              const nodeLevel = level - 2 + i;
              const isCompleted = nodeLevel < level;
              const isCurrent = nodeLevel === level;
              const isFuture = nodeLevel > level;

              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-terminal-bg shadow-lg shadow-yellow-400/30"
                        : isCurrent
                          ? "bg-gradient-to-br from-yellow-400 to-ens-500 text-terminal-bg shadow-lg shadow-yellow-400/50 ring-2 ring-yellow-400/50 ring-offset-2 ring-offset-terminal-bg"
                          : "bg-terminal-panel border border-terminal-border text-terminal-muted"
                    }`}
                  >
                    {nodeLevel > 0 ? nodeLevel : ""}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-yellow-400"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span
                    className={`text-[10px] font-mono ${isCurrent ? "text-yellow-400" : "text-terminal-muted"}`}
                  >
                    {isCurrent ? "NOW" : isFuture ? `Lv.${nodeLevel}` : "✓"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Connecting line */}
          <div className="absolute top-6 left-4 right-4 h-0.5 bg-terminal-border -z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-ens-500"
              initial={{ width: "0%" }}
              animate={{ width: "50%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-400/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-ens-500/5 to-transparent pointer-events-none"></div>
    </div>
  );
}
