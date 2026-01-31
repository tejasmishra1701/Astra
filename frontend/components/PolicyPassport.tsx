'use client';

import { useState } from 'react';

interface PolicyConfig {
    drawdown: number;    // 0-10000 basis points
    maxTrade: number;    // in ETH
    minLiq: number;      // in ETH
    viban: string;
}

/**
 * PolicyPassport - Form with sliders for agent policy configuration
 * 
 * Allows users to configure their trading agent's risk parameters
 * (ast_drawdown, ast_max_trade, ast_min_liq) with visual sliders.
 */
export default function PolicyPassport() {
    const [config, setConfig] = useState<PolicyConfig>({
        drawdown: 500,      // 5%
        maxTrade: 2.0,      // 2 ETH
        minLiq: 0.5,        // 0.5 ETH
        viban: '',
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // TODO: Call AstraResolver.setAllRecords() via wagmi
        console.log('Saving policy:', config);

        setTimeout(() => {
            setIsSaving(false);
        }, 1500);
    };

    return (
        <div className="bg-terminal-panel border border-terminal-border rounded-lg p-6 shadow-terminal">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-accent-primary font-mono flex items-center gap-2">
                    <span className="text-2xl">🛂</span>
                    POLICY PASSPORT
                </h2>
                <div className="px-3 py-1 bg-terminal-bg border border-accent-primary/30 rounded text-xs font-mono text-accent-primary">
                    ENS: agent1.astra.eth
                </div>
            </div>

            <div className="space-y-6">
                {/* Drawdown Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                        <label className="text-sm font-mono text-terminal-text uppercase tracking-wide">
                            ast_drawdown
                            <span className="ml-2 text-xs text-terminal-muted">(max drawdown %)</span>
                        </label>
                        <span className="text-accent-secondary font-mono font-bold">
                            {(config.drawdown / 100).toFixed(2)}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="50"
                        value={config.drawdown}
                        onChange={(e) => setConfig({ ...config, drawdown: parseInt(e.target.value) })}
                        className="w-full h-2 bg-terminal-bg rounded-lg appearance-none cursor-pointer 
                       [&::-webkit-slider-thumb]:appearance-none 
                       [&::-webkit-slider-thumb]:w-4 
                       [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-accent-primary
                       [&::-webkit-slider-thumb]:shadow-neon-cyan
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-webkit-slider-thumb]:transition-transform"
                    />
                    <div className="flex justify-between text-xs text-terminal-muted font-mono">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Max Trade Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                        <label className="text-sm font-mono text-terminal-text uppercase tracking-wide">
                            ast_max_trade
                            <span className="ml-2 text-xs text-terminal-muted">(max trade size)</span>
                        </label>
                        <span className="text-accent-secondary font-mono font-bold">
                            {config.maxTrade.toFixed(2)} ETH
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="10"
                        step="0.1"
                        value={config.maxTrade}
                        onChange={(e) => setConfig({ ...config, maxTrade: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-terminal-bg rounded-lg appearance-none cursor-pointer 
                       [&::-webkit-slider-thumb]:appearance-none 
                       [&::-webkit-slider-thumb]:w-4 
                       [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-accent-primary
                       [&::-webkit-slider-thumb]:shadow-neon-cyan
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-webkit-slider-thumb]:transition-transform"
                    />
                    <div className="flex justify-between text-xs text-terminal-muted font-mono">
                        <span>0.1 ETH</span>
                        <span>5 ETH</span>
                        <span>10 ETH</span>
                    </div>
                </div>

                {/* Min Liquidity Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                        <label className="text-sm font-mono text-terminal-text uppercase tracking-wide">
                            ast_min_liq
                            <span className="ml-2 text-xs text-terminal-muted">(min liquidity)</span>
                        </label>
                        <span className="text-accent-secondary font-mono font-bold">
                            {config.minLiq.toFixed(2)} ETH
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={config.minLiq}
                        onChange={(e) => setConfig({ ...config, minLiq: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-terminal-bg rounded-lg appearance-none cursor-pointer 
                       [&::-webkit-slider-thumb]:appearance-none 
                       [&::-webkit-slider-thumb]:w-4 
                       [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-accent-primary
                       [&::-webkit-slider-thumb]:shadow-neon-cyan
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-webkit-slider-thumb]:transition-transform"
                    />
                    <div className="flex justify-between text-xs text-terminal-muted font-mono">
                        <span>0.1 ETH</span>
                        <span>2.5 ETH</span>
                        <span>5 ETH</span>
                    </div>
                </div>

                {/* VIBAN Input */}
                <div className="space-y-3">
                    <label className="text-sm font-mono text-terminal-text uppercase tracking-wide">
                        ast_viban
                        <span className="ml-2 text-xs text-terminal-muted">(virtual IBAN)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="DE89370400440532013000"
                        value={config.viban}
                        onChange={(e) => setConfig({ ...config, viban: e.target.value })}
                        className="w-full px-4 py-2 bg-terminal-bg border border-terminal-border rounded 
                       text-terminal-text font-mono text-sm
                       focus:border-accent-primary focus:outline-none focus:shadow-neon-cyan
                       transition-all"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 px-6 py-3 bg-accent-primary text-terminal-bg font-mono font-bold
                       rounded shadow-neon-cyan hover:shadow-neon-cyan hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all uppercase tracking-wider"
                    >
                        {isSaving ? 'COMMITTING TO CHAIN...' : 'SAVE POLICY'}
                    </button>
                    <button
                        className="px-6 py-3 bg-terminal-bg border border-terminal-border text-terminal-text
                       font-mono rounded hover:border-accent-secondary hover:text-accent-secondary
                       transition-all uppercase tracking-wider"
                    >
                        RESET
                    </button>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 pt-4 border-t border-terminal-border">
                <p className="text-xs text-terminal-muted font-mono">
                    <span className="text-accent-warning">⚠</span> Policy changes are written to AstraResolver on-chain.
                    Requires wallet signature.
                </p>
            </div>
        </div>
    );
}
