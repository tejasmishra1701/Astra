"use client";

import { useState, useEffect, useRef } from "react";

interface YellowIntent {
  id: string;
  pair: string;
  side: "BUY" | "SELL";
  amount: string;
  price: string;
  timestamp: number;
  node?: string; // ENS node
}

/**
 * IntentStream - Scrolling terminal UI for Yellow Network intent feed
 *
 * Displays real-time trading intents from Yellow Network in a
 * retro terminal aesthetic with auto-scrolling and neon glow effects.
 */
export default function IntentStream() {
  const [intents, setIntents] = useState<YellowIntent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock intent stream (replace with actual Yellow WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      const mockIntent: YellowIntent = {
        id: `intent_${Date.now()}`,
        pair: ["ETH/USDT", "BTC/USDT", "SOL/USDT"][
          Math.floor(Math.random() * 3)
        ],
        side: Math.random() > 0.5 ? "BUY" : "SELL",
        amount: (Math.random() * 10).toFixed(4),
        price: (Math.random() * 50000).toFixed(2),
        timestamp: Date.now(),
      };

      setIntents((prev) => [...prev.slice(-50), mockIntent]); // Keep last 50
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [intents]);

  return (
    <div className="relative h-full bg-terminal-bg/90 backdrop-blur-sm border border-yellow-400/20 rounded-xl overflow-hidden shadow-terminal shadow-yellow-400/5">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-terminal-panel via-terminal-panel to-yellow-400/5 border-b border-yellow-400/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-error shadow-lg shadow-accent-error/50"></div>
          <div className="w-3 h-3 rounded-full bg-accent-warning shadow-lg shadow-accent-warning/50"></div>
          <div className="w-3 h-3 rounded-full bg-accent-success shadow-lg shadow-accent-success/50"></div>
        </div>
        <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">
          ⚡ Yellow Intent Feed
        </span>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent-success animate-ping"></div>
          </div>
          <span className="text-xs text-accent-success font-mono font-bold">
            LIVE
          </span>
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-terminal-scanline pointer-events-none opacity-20"></div>

      {/* Intent Stream */}
      <div
        ref={scrollRef}
        className="h-[calc(100%-52px)] overflow-y-auto font-mono text-sm p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-yellow-400/30 scrollbar-track-terminal-bg"
      >
        {intents.length === 0 && (
          <div className="text-terminal-muted animate-pulse flex items-center gap-2">
            <span className="text-yellow-400">$</span>
            <span>Connecting to Yellow Network</span>
            <span className="inline-flex gap-1">
              <span
                className="w-1 h-1 rounded-full bg-yellow-400 animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-1 h-1 rounded-full bg-yellow-400 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-1 h-1 rounded-full bg-yellow-400 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </span>
          </div>
        )}

        {intents.map((intent, index) => (
          <div
            key={intent.id}
            className="group text-terminal-text hover:bg-yellow-400/5 px-3 py-2 rounded-lg transition-all duration-200 border border-transparent hover:border-yellow-400/20 cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-terminal-muted text-xs">
              [{new Date(intent.timestamp).toLocaleTimeString()}]
            </span>{" "}
            <span
              className={`font-bold ${intent.side === "BUY" ? "text-accent-success" : "text-accent-error"}`}
            >
              {intent.side === "BUY" ? "▲" : "▼"} {intent.side}
            </span>{" "}
            <span className="text-yellow-400 font-semibold">
              {intent.amount}
            </span>{" "}
            <span className="text-terminal-text">{intent.pair}</span>
            {" @ "}
            <span className="text-ens-400">${intent.price}</span>
          </div>
        ))}
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-yellow-400/10 via-yellow-400/5 to-transparent pointer-events-none"></div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
