'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PolicyPassport from '@/components/PolicyPassport';

export default function PassportPage() {
    const [selectedAgent, setSelectedAgent] = useState('alpha.astra.eth');
    const [isCreating, setIsCreating] = useState(false);
    const [newAgentName, setNewAgentName] = useState('');

    const agents = ['alpha.astra.eth', 'beta.astra.eth', 'gamma.astra.eth'];

    const handleCreateAgent = () => {
        if (newAgentName) {
            // TODO: Call ENS subname registration
            console.log('Creating agent:', `${newAgentName}.astra.eth`);
            setIsCreating(false);
            setNewAgentName('');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-mono text-accent-primary flex items-center gap-3">
                        <span className="text-4xl">🛂</span>
                        Agent Passport
                    </h1>
                    <p className="text-terminal-muted font-mono mt-1">
                        Configure your agent&apos;s trading charter
                    </p>
                </div>

                {/* Subname Factory */}
                {!isCreating ? (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="px-6 py-3 bg-accent-secondary text-terminal-bg font-mono font-bold rounded-lg shadow-neon-orange hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <span>+</span>
                        Create New Agent
                    </button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            placeholder="agent-name"
                            value={newAgentName}
                            onChange={(e) => setNewAgentName(e.target.value)}
                            className="px-4 py-2 bg-terminal-panel border border-terminal-border rounded-lg font-mono text-sm focus:border-accent-secondary focus:outline-none"
                        />
                        <span className="flex items-center text-terminal-muted font-mono">.astra.eth</span>
                        <button
                            onClick={handleCreateAgent}
                            className="px-4 py-2 bg-accent-success text-terminal-bg font-mono font-bold rounded-lg"
                        >
                            Mint
                        </button>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 bg-terminal-panel border border-terminal-border rounded-lg text-terminal-muted"
                        >
                            Cancel
                        </button>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Agent Selector */}
                <div className="col-span-12 lg:col-span-3">
                    <div className="bg-terminal-panel border border-terminal-border rounded-lg p-4 shadow-terminal">
                        <h3 className="text-sm font-mono text-terminal-muted mb-4 uppercase tracking-wider">
                            Your Agents
                        </h3>
                        <div className="space-y-2">
                            {agents.map((agent) => (
                                <button
                                    key={agent}
                                    onClick={() => setSelectedAgent(agent)}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all ${selectedAgent === agent
                                            ? 'bg-accent-primary/10 border border-accent-primary text-accent-primary'
                                            : 'bg-terminal-bg border border-terminal-border text-terminal-text hover:border-accent-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{agent}</span>
                                        {selectedAgent === agent && (
                                            <span className="text-accent-primary">→</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 bg-terminal-panel border border-terminal-border rounded-lg p-4">
                        <h3 className="text-sm font-mono text-terminal-muted mb-3 uppercase tracking-wider">
                            Agent Stats
                        </h3>
                        <div className="space-y-2 text-sm font-mono">
                            <div className="flex justify-between">
                                <span className="text-terminal-muted">Created</span>
                                <span className="text-terminal-text">Jan 15, 2026</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-terminal-muted">Total Trades</span>
                                <span className="text-accent-primary">12,459</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-terminal-muted">Success Rate</span>
                                <span className="text-accent-success">98.7%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-terminal-muted">P&L</span>
                                <span className="text-accent-success">+$2,450.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Policy Passport Component */}
                <div className="col-span-12 lg:col-span-9">
                    <PolicyPassport />
                </div>
            </div>
        </div>
    );
}
