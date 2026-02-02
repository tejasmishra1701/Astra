'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock data
const mockAuditLogs = [
    { time: '19:45:32', action: 'APPROVED', details: 'Verified against ast_max_trade', latency: '6ms' },
    { time: '19:45:31', action: 'APPROVED', details: 'Verified against ast_min_liq', latency: '4ms' },
    { time: '19:45:30', action: 'BLOCKED', details: 'Violation: Sector Lock', latency: '2ms' },
    { time: '19:45:29', action: 'APPROVED', details: 'Verified against ast_drawdown', latency: '8ms' },
    { time: '19:45:28', action: 'APPROVED', details: 'Verified against ast_max_trade', latency: '5ms' },
];

export default function AnalyticsPage() {
    const [gasSaved, setGasSaved] = useState(12450.75);

    // Animate gas saved counter
    useEffect(() => {
        const interval = setInterval(() => {
            setGasSaved((prev) => prev + Math.random() * 0.05);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-mono text-accent-primary flex items-center gap-3">
                    <span className="text-4xl">📊</span>
                    Analytics & Proof
                </h1>
                <p className="text-terminal-muted font-mono mt-1">
                    Verifiable compliance and efficiency metrics
                </p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Gas Saved Ticker */}
                <motion.div
                    className="bg-terminal-panel border border-accent-success/50 rounded-lg p-6 shadow-terminal"
                    animate={{ boxShadow: ['0 0 20px rgba(16, 185, 129, 0.2)', '0 0 40px rgba(16, 185, 129, 0.3)', '0 0 20px rgba(16, 185, 129, 0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="text-sm font-mono text-terminal-muted mb-2 uppercase tracking-wider">
                        💰 Gas Saved (All Time)
                    </div>
                    <div className="text-4xl font-mono font-bold text-accent-success">
                        ${gasSaved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs font-mono text-terminal-muted mt-2">
                        By staying off-chain with Yellow Network
                    </div>
                </motion.div>

                {/* Efficiency Gap */}
                <div className="bg-terminal-panel border border-accent-primary/50 rounded-lg p-6 shadow-terminal">
                    <div className="text-sm font-mono text-terminal-muted mb-2 uppercase tracking-wider">
                        ⚡ Efficiency Gap
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-mono font-bold text-accent-primary">8ms</span>
                        <span className="text-terminal-muted font-mono">vs</span>
                        <span className="text-2xl font-mono text-terminal-muted line-through">12s</span>
                    </div>
                    <div className="text-xs font-mono text-terminal-muted mt-2">
                        1,500x faster than on-chain execution
                    </div>
                </div>

                {/* Compliance Score */}
                <div className="bg-terminal-panel border border-terminal-border rounded-lg p-6 shadow-terminal">
                    <div className="text-sm font-mono text-terminal-muted mb-2 uppercase tracking-wider">
                        ✅ Compliance Score
                    </div>
                    <div className="text-4xl font-mono font-bold text-accent-success">99.7%</div>
                    <div className="text-xs font-mono text-terminal-muted mt-2">
                        Clearnode never deviated from ENS rules
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Compliance Audit Logs */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-terminal-panel border border-terminal-border rounded-lg shadow-terminal">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-terminal-border">
                            <h2 className="font-mono font-bold text-terminal-text flex items-center gap-2">
                                📋 Compliance Audit Logs
                            </h2>
                            <button className="px-4 py-2 bg-terminal-bg border border-terminal-border rounded-lg text-sm font-mono text-terminal-muted hover:border-accent-primary transition-colors">
                                Download CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-terminal-border">
                                        <th className="px-6 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">Action</th>
                                        <th className="px-6 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">Latency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockAuditLogs.map((log, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="border-b border-terminal-border hover:bg-terminal-bg transition-colors"
                                        >
                                            <td className="px-6 py-4 font-mono text-sm text-terminal-muted">{log.time}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${log.action === 'APPROVED'
                                                        ? 'bg-accent-success/20 text-accent-success'
                                                        : 'bg-accent-error/20 text-accent-error'
                                                    }`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-sm text-terminal-text">{log.details}</td>
                                            <td className="px-6 py-4 font-mono text-sm text-accent-primary">{log.latency}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Performance Breakdown */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                    <div className="bg-terminal-panel border border-terminal-border rounded-lg p-5">
                        <h3 className="font-mono font-bold text-terminal-text mb-4">📈 Performance</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm font-mono mb-1">
                                    <span className="text-terminal-muted">Trades Executed</span>
                                    <span className="text-terminal-text">12,459</span>
                                </div>
                                <div className="h-2 bg-terminal-bg rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '85%' }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="h-full bg-accent-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-mono mb-1">
                                    <span className="text-terminal-muted">Trades Blocked</span>
                                    <span className="text-terminal-text">38</span>
                                </div>
                                <div className="h-2 bg-terminal-bg rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '3%' }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="h-full bg-accent-error"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-mono mb-1">
                                    <span className="text-terminal-muted">Avg Latency</span>
                                    <span className="text-terminal-text">6.2ms</span>
                                </div>
                                <div className="h-2 bg-terminal-bg rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '15%' }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                        className="h-full bg-accent-success"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-terminal-panel border border-terminal-border rounded-lg p-5">
                        <h3 className="font-mono font-bold text-terminal-text mb-4">🏆 Efficiency Proof</h3>
                        <div className="space-y-3 text-sm font-mono">
                            <div className="flex justify-between">
                                <span className="text-terminal-muted">On-chain cost</span>
                                <span className="text-accent-error line-through">$15,890.50</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-terminal-muted">Yellow cost</span>
                                <span className="text-accent-success">$3,439.75</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-terminal-border">
                                <span className="text-terminal-text font-bold">Savings</span>
                                <span className="text-accent-primary font-bold">78%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
