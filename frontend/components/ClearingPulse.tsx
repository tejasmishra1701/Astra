'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type ClearingStatus = 'idle' | 'checking' | 'clearing' | 'success' | 'failed';

/**
 * ClearingPulse - Framer Motion visualizer for trade clearing status
 * 
 * Animated visualization showing real-time trade clearing status
 * with pulsing effects and state transitions.
 */
export default function ClearingPulse() {
    const [status, setStatus] = useState<ClearingStatus>('idle');
    const [tradesCleared, setTradesCleared] = useState(0);
    const [tradesFailed, setTradesFailed] = useState(0);

    // Mock status updates (replace with actual backend WebSocket)
    useEffect(() => {
        const interval = setInterval(() => {
            const statuses: ClearingStatus[] = ['checking', 'clearing', 'success', 'failed'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            setStatus(newStatus);

            if (newStatus === 'success') {
                setTradesCleared(prev => prev + 1);
            } else if (newStatus === 'failed') {
                setTradesFailed(prev => prev + 1);
            }

            // Return to idle after animation
            setTimeout(() => setStatus('idle'), 1500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const getStatusConfig = (status: ClearingStatus) => {
        switch (status) {
            case 'checking':
                return {
                    color: 'rgb(251, 191, 36)', // amber
                    label: 'CHECKING COMPLIANCE',
                    scale: 1.1,
                    shadow: '0 0 40px rgba(251, 191, 36, 0.6)',
                };
            case 'clearing':
                return {
                    color: 'rgb(0, 255, 255)', // neon cyan
                    label: 'CLEARING TRADE',
                    scale: 1.3,
                    shadow: '0 0 60px rgba(0, 255, 255, 0.8)',
                };
            case 'success':
                return {
                    color: 'rgb(16, 185, 129)', // green
                    label: '✓ CLEARED',
                    scale: 1.5,
                    shadow: '0 0 80px rgba(16, 185, 129, 0.8)',
                };
            case 'failed':
                return {
                    color: 'rgb(239, 68, 68)', // red
                    label: '✗ REJECTED',
                    scale: 1.2,
                    shadow: '0 0 50px rgba(239, 68, 68, 0.7)',
                };
            default:
                return {
                    color: 'rgb(131, 131, 143)', // muted
                    label: 'AWAITING INTENT',
                    scale: 1.0,
                    shadow: '0 0 20px rgba(131, 131, 143, 0.3)',
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <div className="relative h-full bg-terminal-panel border border-terminal-border rounded-lg overflow-hidden shadow-terminal">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-terminal-border">
                <h3 className="text-lg font-mono font-bold text-accent-primary uppercase tracking-wider">
                    Clearing Pulse
                </h3>
                <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent-success"></div>
                        <span className="text-terminal-muted">Cleared: <span className="text-accent-success font-bold">{tradesCleared}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent-error"></div>
                        <span className="text-terminal-muted">Failed: <span className="text-accent-error font-bold">{tradesFailed}</span></span>
                    </div>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="flex flex-col items-center justify-center h-[calc(100%-64px)] relative">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className="border border-terminal-border"></div>
                        ))}
                    </div>
                </div>

                {/* Orbiting Rings */}
                <motion.div
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-64 h-64 border border-terminal-border/30 rounded-full"></div>
                </motion.div>

                <motion.div
                    className="absolute"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-48 h-48 border border-terminal-border/20 rounded-full"></div>
                </motion.div>

                {/* Central Pulse */}
                <div className="relative z-10">
                    <motion.div
                        className="w-32 h-32 rounded-full"
                        style={{ backgroundColor: config.color }}
                        animate={{
                            scale: [1, config.scale, 1],
                            boxShadow: [
                                '0 0 20px rgba(131, 131, 143, 0.3)',
                                config.shadow,
                                '0 0 20px rgba(131, 131, 143, 0.3)',
                            ],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Inner Circle */}
                    <motion.div
                        className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-terminal-bg border-2"
                        style={{ borderColor: config.color }}
                        animate={{
                            rotate: status === 'clearing' ? 360 : 0,
                        }}
                        transition={{
                            duration: 2,
                            repeat: status === 'clearing' ? Infinity : 0,
                            ease: "linear",
                        }}
                    >
                        <div
                            className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full"
                            style={{ backgroundColor: config.color }}
                        />
                    </motion.div>
                </div>

                {/* Status Label */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={status}
                >
                    <div
                        className="text-2xl font-mono font-bold uppercase tracking-widest"
                        style={{ color: config.color }}
                    >
                        {config.label}
                    </div>
                    <div className="mt-2 text-xs text-terminal-muted font-mono">
                        {status === 'idle' && 'Monitoring Yellow Network...'}
                        {status === 'checking' && 'Validating against AstraResolver policies...'}
                        {status === 'clearing' && 'Executing trade via state channel...'}
                        {status === 'success' && 'Trade successfully cleared and settled'}
                        {status === 'failed' && 'Policy violation detected - trade rejected'}
                    </div>
                </motion.div>

                {/* Particle Effects */}
                {status === 'success' && (
                    <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-accent-success"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                }}
                                animate={{
                                    x: Math.cos((i / 12) * Math.PI * 2) * 150,
                                    y: Math.sin((i / 12) * Math.PI * 2) * 150,
                                    opacity: [1, 0],
                                    scale: [1, 0],
                                }}
                                transition={{
                                    duration: 1,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
