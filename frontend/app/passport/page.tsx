'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Plus, X, Check, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import PolicyPassport from '@/components/PolicyPassport';

export default function PassportPage() {
    const [selectedAgent, setSelectedAgent] = useState('alpha.astra.eth');
    const [isCreating, setIsCreating] = useState(false);
    const [newAgentName, setNewAgentName] = useState('');

    const agents = [
        { name: 'alpha.astra.eth', status: 'active', compliance: 99.2 },
        { name: 'beta.astra.eth', status: 'active', compliance: 97.8 },
        { name: 'gamma.astra.eth', status: 'idle', compliance: 98.5 },
    ];

    const handleCreateAgent = () => {
        if (newAgentName) {
            // TODO: Call ENS subname registration
            console.log('Creating agent:', `${newAgentName}.astra.eth`);
            setIsCreating(false);
            setNewAgentName('');
        }
    };

    const selectedAgentData = agents.find(a => a.name === selectedAgent);

    return (
        <div className="min-h-screen bg-gradient-to-b from-terminal-bg via-terminal-bg to-terminal-panel/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 mt-4">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-neon-cyan">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-terminal-text">
                                    Agent Passport
                                </h1>
                                <p className="text-terminal-muted text-sm">
                                    Configure your agent&apos;s trading charter and safety limits
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Create Agent Button */}
                    <AnimatePresence mode="wait">
                        {!isCreating ? (
                            <motion.button
                                key="create-button"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => setIsCreating(true)}
                                className="px-6 py-3 bg-gradient-to-r from-accent-secondary to-orange-600 text-white font-bold rounded-lg shadow-neon-orange hover:shadow-neon-orange hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
                            >
                                <Plus className="w-5 h-5" />
                                Create New Agent
                            </motion.button>
                        ) : (
                            <motion.div
                                key="create-form"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-wrap items-center gap-2 bg-terminal-panel border border-terminal-border rounded-lg p-3"
                            >
                                <input
                                    type="text"
                                    placeholder="agent-name"
                                    value={newAgentName}
                                    onChange={(e) => setNewAgentName(e.target.value)}
                                    className="px-4 py-2 bg-terminal-bg border border-terminal-border rounded-lg font-mono text-sm focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/20 transition-all"
                                    autoFocus
                                />
                                <span className="text-terminal-muted font-mono text-sm">.astra.eth</span>
                                <button
                                    onClick={handleCreateAgent}
                                    disabled={!newAgentName}
                                    className="px-4 py-2 bg-accent-success text-white font-bold rounded-lg hover:bg-accent-success/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Mint
                                </button>
                                <button
                                    onClick={() => {
                                        setIsCreating(false);
                                        setNewAgentName('');
                                    }}
                                    className="p-2 bg-terminal-bg border border-terminal-border rounded-lg text-terminal-muted hover:text-terminal-text hover:border-accent-error/50 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Agent Selector */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 lg:col-span-3 space-y-4"
                    >
                        {/* Agent List */}
                        <div className="bg-terminal-panel border border-terminal-border rounded-xl p-5 shadow-terminal">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-terminal-text uppercase tracking-wider">
                                    Your Agents
                                </h3>
                                <span className="text-xs text-terminal-muted bg-terminal-bg px-2 py-1 rounded-full">
                                    {agents.length}
                                </span>
                            </div>
                            <div className="space-y-2">
                                {agents.map((agent, index) => (
                                    <motion.button
                                        key={agent.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        onClick={() => setSelectedAgent(agent.name)}
                                        className={`w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all group ${
                                            selectedAgent === agent.name
                                                ? 'bg-accent-primary/10 border border-accent-primary text-accent-primary shadow-lg'
                                                : 'bg-terminal-bg border border-terminal-border text-terminal-text hover:border-accent-primary/50 hover:bg-terminal-bg/50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="truncate">{agent.name}</span>
                                            {selectedAgent === agent.name && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-accent-primary"
                                                >
                                                    →
                                                </motion.span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-2 h-2 rounded-full ${
                                                agent.status === 'active' ? 'bg-accent-success animate-pulse' : 'bg-terminal-muted'
                                            }`}></div>
                                            <span className="text-terminal-muted capitalize">{agent.status}</span>
                                            <span className="text-terminal-muted">•</span>
                                            <span className={`${
                                                agent.compliance >= 98 ? 'text-accent-success' : 'text-accent-warning'
                                            }`}>
                                                {agent.compliance}%
                                            </span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Agent Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-terminal-panel border border-terminal-border rounded-xl p-5 shadow-terminal"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-4 h-4 text-accent-primary" />
                                <h3 className="text-sm font-semibold text-terminal-text uppercase tracking-wider">
                                    Agent Stats
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-terminal-muted">Created</span>
                                    <span className="text-sm text-terminal-text font-mono">Jan 15, 2026</span>
                                </div>
                                <div className="h-px bg-terminal-border"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-terminal-muted">Total Trades</span>
                                    <span className="text-sm text-accent-primary font-mono font-bold">12,459</span>
                                </div>
                                <div className="h-px bg-terminal-border"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-terminal-muted">Success Rate</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-terminal-bg rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-success rounded-full" style={{ width: '98.7%' }}></div>
                                        </div>
                                        <span className="text-sm text-accent-success font-mono font-bold">98.7%</span>
                                    </div>
                                </div>
                                <div className="h-px bg-terminal-border"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-terminal-muted">P&L</span>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3 text-accent-success" />
                                        <span className="text-sm text-accent-success font-mono font-bold">+$2,450.00</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Compliance Status */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-accent-success/10 to-accent-primary/10 border border-accent-success/30 rounded-xl p-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-accent-success/20 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-accent-success" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-accent-success mb-1">Fully Compliant</h4>
                                    <p className="text-xs text-terminal-muted">
                                        All policies are active and verified on-chain
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Policy Passport */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 lg:col-span-9"
                    >
                        <PolicyPassport agentName={selectedAgent} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
