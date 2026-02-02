"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Shield,
  Zap,
  BarChart3,
  Trophy,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/passport", label: "Passport", icon: Shield },
  { href: "/terminal", label: "Terminal", icon: Zap },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/how-it-works", label: "Guide", icon: BookOpen },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg/80 backdrop-blur-xl border-b border-terminal-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-ens-500 flex items-center justify-center shadow-neon-yellow group-hover:shadow-glow-sm transition-all duration-300 group-hover:scale-105">
                <span className="text-xl font-bold text-terminal-bg">A</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400 to-ens-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-ens-500 bg-clip-text text-transparent">
                ASTRA
              </span>
              <div className="text-[10px] text-terminal-muted font-mono -mt-1">
                Yellow × ENS
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links - Hidden on smaller screens when wallet connected */}
          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive
                      ? "text-accent-primary"
                      : "text-terminal-muted hover:text-terminal-text hover:bg-terminal-panel/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 border border-accent-primary/30 rounded-lg bg-accent-primary/5"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Network Status - Hidden on mobile */}
            {/* <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-terminal-panel/50 rounded-full border border-terminal-border/50">
              <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse"></div>
              <span className="text-xs font-mono text-terminal-muted whitespace-nowrap">
                Yellow Network
              </span>
            </div> */}

            {/* Wallet Connect */}
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const connected = mounted && account && chain;

                return (
                  <div
                    className={!mounted ? "opacity-0 pointer-events-none" : ""}
                  >
                    {!connected ? (
                      <button
                        onClick={openConnectModal}
                        className="px-4 py-2 bg-accent-primary text-terminal-bg font-semibold rounded-lg hover:bg-accent-primary/90 transition-all hover:scale-105 shadow-lg whitespace-nowrap text-sm"
                      >
                        Connect
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={openChainModal}
                          className="hidden lg:flex items-center gap-2 px-3 py-2 bg-terminal-panel/50 rounded-lg border border-terminal-border/50 hover:border-accent-primary/50 transition-colors"
                        >
                          {chain.hasIcon && chain.iconUrl && (
                            <img
                              src={chain.iconUrl}
                              alt={chain.name}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span className="text-sm font-medium text-terminal-text hidden xl:inline">
                            {chain.name}
                          </span>
                        </button>
                        <button
                          onClick={openAccountModal}
                          className="px-3 py-2 bg-terminal-panel/50 rounded-lg border border-accent-primary/50 text-accent-primary font-medium text-sm hover:bg-accent-primary/10 transition-colors whitespace-nowrap"
                        >
                          {account.displayName}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-terminal-muted hover:text-terminal-text transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="xl:hidden border-t border-terminal-border/50 bg-terminal-bg/95 backdrop-blur-xl"
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/30"
                      : "text-terminal-muted hover:text-terminal-text hover:bg-terminal-panel/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
