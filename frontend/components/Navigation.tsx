'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

const navItems = [
    { href: '/', label: 'Command Center', icon: '🎛️' },
    { href: '/passport', label: 'Agent Passport', icon: '🛂' },
    { href: '/terminal', label: 'Clearing Terminal', icon: '⚡' },
    { href: '/analytics', label: 'Analytics', icon: '📊' },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg/95 backdrop-blur-md border-b border-terminal-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-neon-cyan group-hover:scale-110 transition-transform">
                            <span className="text-xl font-bold text-terminal-bg">A</span>
                        </div>
                        <div>
                            <span className="text-xl font-bold font-mono text-accent-primary">ASTRA</span>
                            <span className="hidden sm:inline text-xs text-terminal-muted ml-2 font-mono">v1.0</span>
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-lg font-mono text-sm transition-all ${isActive
                                            ? 'text-accent-primary'
                                            : 'text-terminal-muted hover:text-terminal-text hover:bg-terminal-panel'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute inset-0 border border-accent-primary/50 rounded-lg bg-accent-primary/10"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Wallet Connect */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-terminal-panel rounded-full border border-terminal-border">
                            <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse"></div>
                            <span className="text-xs font-mono text-terminal-muted">Yellow Network</span>
                        </div>
                        <ConnectButton.Custom>
                            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                                const connected = mounted && account && chain;

                                return (
                                    <div className={!mounted ? 'opacity-0 pointer-events-none' : ''}>
                                        {!connected ? (
                                            <button
                                                onClick={openConnectModal}
                                                className="px-4 py-2 bg-accent-primary text-terminal-bg font-mono font-bold rounded-lg shadow-neon-cyan hover:scale-105 transition-transform"
                                            >
                                                Connect
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={openChainModal}
                                                    className="flex items-center gap-2 px-3 py-2 bg-terminal-panel rounded-lg border border-terminal-border hover:border-accent-primary transition-colors"
                                                >
                                                    {chain.hasIcon && chain.iconUrl && (
                                                        <img src={chain.iconUrl} alt={chain.name} className="w-5 h-5 rounded-full" />
                                                    )}
                                                    <span className="text-sm font-mono text-terminal-text">{chain.name}</span>
                                                </button>
                                                <button
                                                    onClick={openAccountModal}
                                                    className="px-4 py-2 bg-terminal-panel rounded-lg border border-accent-primary text-accent-primary font-mono text-sm hover:bg-accent-primary/10 transition-colors"
                                                >
                                                    {account.displayName}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden flex items-center justify-around py-2 border-t border-terminal-border">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${isActive ? 'text-accent-primary' : 'text-terminal-muted'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-[10px] font-mono">{item.label.split(' ')[0]}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
