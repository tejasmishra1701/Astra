'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Square, RotateCw, Building2, TrendingUp } from 'lucide-react';
import ClearingPulse from '@/components/ClearingPulse';

export default function TerminalPage() {
    const [sessionActive, setSessionActive] = useState(false);
    const [autoCompound, setAutoCompound] = useState(false);
    const [vibanEnabled, setVibanEnabled] = useState(false);

    const handleStartSession = () => {
        setSessionActive(true);
        // TODO: Initialize Yellow Nitrolite session
    };

    const handleStopSession = () => {
        setSessionActive(false);
        // TODO: Settle Yellow session
    };

    return (
        <div className="max-w-7xl mx-auto px-6 space-y-6 mt-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-accent-primary flex items-center gap-3">
                        <Zap className="w-8 h-8" />
                        Clearing Terminal
                    </h1>
                    <p className="text-terminal-muted mt-1">
                        Real-time trade execution and session management
                    </p>
                </div>

                {/* Session Controls */}
                <div className="flex gap-3">
                    {!sessionActive ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartSession}
                            className="px-6 py-3 bg-accent-success text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Start Trading
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStopSession}
                            className="px-6 py-3 bg-accent-error text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
                        >
                            <Square className="w-5 h-5" />
                            Emergency Settle
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Session Status Banner */}
            <motion.div
                animate={{
                    backgroundColor: sessionActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(131, 131, 143, 0.1)',
                    borderColor: sessionActive ? 'rgba(16, 185, 129, 0.5)' : 'rgba(131, 131, 143, 0.3)',
                }}
                className="border rounded-lg p-4 flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${sessionActive ? 'bg-accent-success animate-pulse' : 'bg-terminal-muted'}`}></div>
                    <div>
                        <div className="font-bold text-terminal-text">
                            {sessionActive ? 'SESSION ACTIVE' : 'SESSION INACTIVE'}
                        </div>
                        <div className="text-sm text-terminal-muted">
                            {sessionActive ? 'Yellow Nitrolite channel open • Agent: alpha.astra.eth' : 'Start trading to open a session'}
                        </div>
                    </div>
                </div>
                {sessionActive && (
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-accent-primary">847</div>
                        <div className="text-xs text-terminal-muted">trades this session</div>
                    </div>
                )}
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
                {/* Session Visualizer - ClearingPulse */}
                <div className="col-span-12 lg:col-span-8 h-[450px]">
                    <ClearingPulse />
                </div>

                {/* Controls Panel */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                    {/* Auto-Compounding */}
                    <div className="bg-terminal-panel border border-terminal-border rounded-lg p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-terminal-text flex items-center gap-2">
                                <RotateCw className="w-5 h-5 text-accent-primary" />
                                Auto-Compound
                            </h3>
                            <button
                                onClick={() => setAutoCompound(!autoCompound)}
                                className={`w-14 h-7 rounded-full transition-all relative ${autoCompound ? 'bg-accent-primary' : 'bg-terminal-border'
                                    }`}
                            >
                                <motion.div
                                    animate={{ x: autoCompound ? 28 : 2 }}
                                    className="w-6 h-6 bg-white rounded-full absolute top-0.5"
                                />
                            </button>
                        </div>
                        <p className="text-sm text-terminal-muted">
                            Automatically reinvest 25% of profits into ClearSync deposit
                        </p>
                        {autoCompound && (
                            <div className="mt-3 pt-3 border-t border-terminal-border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-terminal-muted">Compounded today</span>
                                    <span className="text-accent-success font-mono">+0.02 ETH</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* vIBAN Settlement */}
                    <div className="bg-terminal-panel border border-terminal-border rounded-lg p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-terminal-text flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-accent-secondary" />
                                vIBAN Settlement
                            </h3>
                            <button
                                onClick={() => setVibanEnabled(!vibanEnabled)}
                                className={`w-14 h-7 rounded-full transition-all relative ${vibanEnabled ? 'bg-accent-secondary' : 'bg-terminal-border'
                                    }`}
                            >
                                <motion.div
                                    animate={{ x: vibanEnabled ? 28 : 2 }}
                                    className="w-6 h-6 bg-white rounded-full absolute top-0.5"
                                />
                            </button>
                        </div>
                        <p className="text-sm text-terminal-muted">
                            Auto off-ramp to TradFi when profit threshold is hit
                        </p>
                        {vibanEnabled && (
                            <div className="mt-3 pt-3 border-t border-terminal-border space-y-2">
                                <div className="text-xs text-terminal-muted">VIBAN</div>
                                <div className="font-mono text-accent-secondary text-sm">
                                    DE89 3704 0044 0532 0130 00
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Session Stats */}
                    <div className="bg-terminal-panel border border-terminal-border rounded-lg p-5">
                        <h3 className="font-bold text-terminal-text mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-accent-primary" />
                            Session Stats
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-terminal-muted">Avg Latency</span>
                                <span className="text-accent-primary font-mono">6.2ms</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-terminal-muted">Compliance Rate</span>
                                <span className="text-accent-success font-mono">99.8%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-terminal-muted">Blocked Trades</span>
                                <span className="text-accent-error font-mono">3</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-terminal-muted">Session P&L</span>
                                <span className="text-accent-success font-mono">+$127.45</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
