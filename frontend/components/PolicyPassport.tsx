'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, Save, RotateCcw, Info } from 'lucide-react';

interface PolicyConfig {
    drawdown: number;    // 0-10000 basis points
    maxTrade: number;    // in ETH
    minLiq: number;      // in ETH
    viban: string;
}

interface PolicyPassportProps {
    agentName?: string;
}

/**
 * PolicyPassport - Form with sliders for agent policy configuration
 * 
 * Allows users to configure their trading agent's risk parameters
 * (ast_drawdown, ast_max_trade, ast_min_liq) with visual sliders.
 */
export default function PolicyPassport({ agentName = 'agent1.astra.eth' }: PolicyPassportProps) {
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

    const handleReset = () => {
        setConfig({
            drawdown: 500,
            maxTrade: 2.0,
            minLiq: 0.5,
            viban: '',
        });
    };

    return (
        <div className="bg-terminal-panel border border-terminal-border rounded-xl shadow-terminal overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-primary/10 border-b border-terminal-border px-6 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-neon-cyan">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-terminal-text">
                                POLICY PASSPORT
                            </h2>
                            <p className="text-xs text-terminal-muted">On-chain safety charter</p>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-terminal-bg/50 border border-accent-primary/30 rounded-lg">
                        <div className="text-[10px] text-terminal-muted uppercase tracking-wider mb-0.5">ENS Identity</div>
                        <div className="text-sm font-mono text-accent-primary font-semibold">{agentName}</div>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Info Banner */}
                <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-lg p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-accent-primary mb-1">Policy Configuration</h4>
                        <p className="text-xs text-terminal-muted leading-relaxed">
                            These parameters define your agent&apos;s trading boundaries. All values are stored on-chain via ENS text records and enforced in real-time by the ASTRA clearing node.
                        </p>
                    </div>
                </div>

                {/* Drawdown Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <div>
                            <label className="text-sm font-semibold text-terminal-text uppercase tracking-wide flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                                ast_drawdown
                            </label>
                            <p className="text-xs text-terminal-muted mt-1">Maximum portfolio drawdown percentage</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold text-accent-secondary">
                                {(config.drawdown / 100).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="50"
                            value={config.drawdown}
                            onChange={(e) => setConfig({ ...config, drawdown: parseInt(e.target.value) })}
                            className="w-full h-3 bg-terminal-bg rounded-lg appearance-none cursor-pointer 
                           [&::-webkit-slider-thumb]:appearance-none 
                           [&::-webkit-slider-thumb]:w-5 
                           [&::-webkit-slider-thumb]:h-5 
                           [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:bg-gradient-to-br
                           [&::-webkit-slider-thumb]:from-accent-primary
                           [&::-webkit-slider-thumb]:to-accent-secondary
                           [&::-webkit-slider-thumb]:shadow-neon-cyan
                           [&::-webkit-slider-thumb]:hover:scale-110
                           [&::-webkit-slider-thumb]:transition-transform
                           [&::-webkit-slider-thumb]:cursor-grab
                           [&::-webkit-slider-thumb]:active:cursor-grabbing"
                        />
                        <div className="absolute inset-0 h-3 bg-gradient-to-r from-accent-success via-accent-warning to-accent-error rounded-lg opacity-20 pointer-events-none"></div>
                    </div>
                    <div className="flex justify-between text-xs text-terminal-muted font-mono">
                        <span>0% (No limit)</span>
                        <span>50% (Moderate)</span>
                        <span>100% (Maximum)</span>
                    </div>
                </div>

                <div className="h-px bg-terminal-border"></div>

                {/* Max Trade Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <div>
                            <label className="text-sm font-semibold text-terminal-text uppercase tracking-wide flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-secondary"></span>
                                ast_max_trade
                            </label>
                            <p className="text-xs text-terminal-muted mt-1">Maximum single trade size in ETH</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold text-accent-secondary">
                                {config.maxTrade.toFixed(2)} ETH
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="range"
                            min="0.1"
                            max="10"
                            step="0.1"
                            value={config.maxTrade}
                            onChange={(e) => setConfig({ ...config, maxTrade: parseFloat(e.target.value) })}
                            className="w-full h-3 bg-terminal-bg rounded-lg appearance-none cursor-pointer 
                           [&::-webkit-slider-thumb]:appearance-none 
                           [&::-webkit-slider-thumb]:w-5 
                           [&::-webkit-slider-thumb]:h-5 
                           [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:bg-gradient-to-br
                           [&::-webkit-slider-thumb]:from-accent-secondary
                           [&::-webkit-slider-thumb]:to-orange-600
                           [&::-webkit-slider-thumb]:shadow-neon-orange
                           [&::-webkit-slider-thumb]:hover:scale-110
                           [&::-webkit-slider-thumb]:transition-transform
                           [&::-webkit-slider-thumb]:cursor-grab
                           [&::-webkit-slider-thumb]:active:cursor-grabbing"
                        />
                        <div className="absolute inset-0 h-3 bg-gradient-to-r from-accent-secondary to-orange-600 rounded-lg opacity-20 pointer-events-none"></div>
                    </div>
                    <div className="flex justify-between text-xs text-terminal-muted font-mono">
                        <span>0.1 ETH</span>
                        <span>5 ETH</span>
                        <span>10 ETH</span>
                    </div>
                </div>

                <div className="h-px bg-terminal-border"></div>

                {/* Min Liquidity Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <div>
                            <label className="text-sm font-semibold text-terminal-text uppercase tracking-wide flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-success"></span>
                                ast_min_liq
                            </label>
                            <p className="text-xs text-terminal-muted mt-1">Minimum pool liquidity requirement</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold text-accent-secondary">
                                {config.minLiq.toFixed(2)} ETH
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="range"
                            min="0.1"
                            max="5"
                            step="0.1"
                            value={config.minLiq}
                            onChange={(e) => setConfig({ ...config, minLiq: parseFloat(e.target.value) })}
                            className="w-full h-3 bg-terminal-bg rounded-lg appearance-none cursor-pointer 
                           [&::-webkit-slider-thumb]:appearance-none 
                           [&::-webkit-slider-thumb]:w-5 
                           [&::-webkit-slider-thumb]:h-5 
                           [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:bg-gradient-to-br
                           [&::-webkit-slider-thumb]:from-accent-success
                           [&::-webkit-slider-thumb]:to-emerald-600
                           [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(16,185,129,0.5)]
                           [&::-webkit-slider-thumb]:hover:scale-110
                           [&::-webkit-slider-thumb]:transition-transform
                           [&::-webkit-slider-thumb]:cursor-grab
                           [&::-webkit-slider-thumb]:active:cursor-grabbing"
                        />
                        <div className="absolute inset-0 h-3 bg-gradient-to-r from-accent-success to-emerald-600 rounded-lg opacity-20 pointer-events-none"></div>
                    </div>
                    <div className="flex justify-between text-xs text-terminal-muted font-mono">
                        <span>0.1 ETH</span>
                        <span>2.5 ETH</span>
                        <span>5 ETH</span>
                    </div>
                </div>

                <div className="h-px bg-terminal-border"></div>

                {/* VIBAN Input */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-terminal-text uppercase tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            ast_viban
                        </label>
                        <p className="text-xs text-terminal-muted mt-1">Virtual IBAN for automated fiat off-ramp</p>
                    </div>
                    <input
                        type="text"
                        placeholder="DE89370400440532013000"
                        value={config.viban}
                        onChange={(e) => setConfig({ ...config, viban: e.target.value })}
                        className="w-full px-4 py-3 bg-terminal-bg border border-terminal-border rounded-lg 
                       text-terminal-text font-mono text-sm
                       focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20
                       transition-all placeholder:text-terminal-muted/50"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 px-6 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold
                       rounded-lg shadow-neon-cyan hover:shadow-neon-cyan hover:scale-[1.02]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                COMMITTING TO CHAIN...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                SAVE POLICY
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isSaving}
                        className="px-6 py-4 bg-terminal-bg border-2 border-terminal-border text-terminal-text
                       font-bold rounded-lg hover:border-accent-secondary hover:text-accent-secondary hover:bg-terminal-panel
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all uppercase tracking-wider flex items-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        RESET
                    </button>
                </div>
            </div>

            {/* Bottom Warning */}
            <div className="bg-accent-warning/5 border-t border-accent-warning/20 px-6 py-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent-warning flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-terminal-muted leading-relaxed">
                        <span className="text-accent-warning font-semibold">Important:</span> Policy changes are written to AstraResolver on-chain and require a wallet signature. Changes take effect immediately and will be enforced on all future trades.
                    </p>
                </div>
            </div>
        </div>
    );
}
