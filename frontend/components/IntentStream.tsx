'use client';

import { useState, useEffect, useRef } from 'react';

interface YellowIntent {
    id: string;
    pair: string;
    side: 'BUY' | 'SELL';
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
                pair: ['ETH/USDT', 'BTC/USDT', 'SOL/USDT'][Math.floor(Math.random() * 3)],
                side: Math.random() > 0.5 ? 'BUY' : 'SELL',
                amount: (Math.random() * 10).toFixed(4),
                price: (Math.random() * 50000).toFixed(2),
                timestamp: Date.now(),
            };

            setIntents(prev => [...prev.slice(-50), mockIntent]); // Keep last 50
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
        <div className="relative h-full bg-terminal-bg border border-terminal-border rounded-lg overflow-hidden shadow-terminal">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-terminal-panel border-b border-terminal-border">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-error"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-warning"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-success"></div>
                </div>
                <span className="text-xs font-mono text-terminal-muted uppercase tracking-wider">
                    Yellow Intent Feed
                </span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></div>
                    <span className="text-xs text-accent-primary font-mono">LIVE</span>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-terminal-scanline pointer-events-none opacity-30"></div>

            {/* Intent Stream */}
            <div
                ref={scrollRef}
                className="h-[calc(100%-48px)] overflow-y-auto font-mono text-sm p-4 space-y-1 scrollbar-thin scrollbar-thumb-terminal-border scrollbar-track-terminal-bg"
            >
                {intents.length === 0 && (
                    <div className="text-terminal-muted animate-pulse">
                        <span className="text-accent-primary">$</span> Connecting to Yellow Network...
                    </div>
                )}

                {intents.map((intent) => (
                    <div
                        key={intent.id}
                        className="text-terminal-text hover:bg-terminal-panel px-2 py-1 rounded transition-colors animate-flicker"
                    >
                        <span className="text-terminal-muted">[{new Date(intent.timestamp).toLocaleTimeString()}]</span>
                        {' '}
                        <span className={intent.side === 'BUY' ? 'text-accent-success' : 'text-accent-error'}>
                            {intent.side}
                        </span>
                        {' '}
                        <span className="text-accent-primary font-semibold">{intent.amount}</span>
                        {' '}
                        <span className="text-terminal-text">{intent.pair}</span>
                        {' @ '}
                        <span className="text-accent-secondary">${intent.price}</span>
                    </div>
                ))}
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-accent-primary/10 to-transparent pointer-events-none"></div>
        </div>
    );
}
