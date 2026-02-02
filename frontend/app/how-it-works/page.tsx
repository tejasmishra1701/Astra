'use client';

import { Bot, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const steps = [
  {
    icon: Bot,
    title: '1. Deploy Agent',
    subtitle: 'Create Your AI Trader',
    description:
      'Create your AI trading agent with custom logic. Each agent gets a unique ENS subname (e.g., bot01.astra.eth) as its permanent identity.',
    features: [
      'Unique ENS identity',
      'Custom trading strategies',
      'One-time gas fee for setup',
      'Deposit fuel (USDC/ETH)',
    ],
    color: 'cyan',
  },
  {
    icon: Shield,
    title: '2. Set Policy',
    subtitle: 'Define Rules via ENS',
    description:
      'Define safety limits on-chain with AstraResolver ENS records. Your agent\'s behavior is transparent and verifiable by anyone.',
    features: [
      'Max trade size limits',
      'Minimum liquidity requirements',
      'Drawdown protection',
      'vIBAN for fiat off-ramp',
    ],
    color: 'orange',
  },
  {
    icon: Zap,
    title: '3. Auto-Verify',
    subtitle: 'Trade at Lightning Speed',
    description:
      'ASTRA checks every trade against your policy rules in milliseconds. Zero gas fees per trade using Yellow Network Layer-3 execution.',
    features: [
      '8ms execution time',
      'Zero gas per trade',
      'Real-time compliance',
      'Instant policy updates',
    ],
    color: 'success',
  },
];

const benefits = [
  {
    title: 'Decentralized Compliance',
    description: 'Rules stored on-chain, not in private databases',
  },
  {
    title: 'Millisecond Enforcement',
    description: '8ms execution vs 12s block time',
  },
  {
    title: 'Zero-Gas Trading',
    description: 'All trades off-chain via state channels',
  },
  {
    title: 'Real-Time Updates',
    description: 'Modify policies while agent is trading',
  },
  {
    title: 'Transparent Audit',
    description: 'Anyone can verify agent behavior on-chain',
  },
  {
    title: 'Institutional Speed',
    description: 'High-frequency trading for everyone',
  },
];

export default function HowItWorksPage() {
  const router = useRouter();

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-500',
        glow: 'shadow-neon-cyan',
      },
      orange: {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-500',
        glow: 'shadow-neon-orange',
      },
      success: {
        bg: 'bg-accent-success/10',
        border: 'border-accent-success/30',
        text: 'text-accent-success',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
      },
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl mt-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-terminal-text mb-4">
          How ASTRA Works
        </h1>
        <p className="text-lg text-terminal-muted max-w-3xl mx-auto">
          High-frequency, policy-driven clearing terminal enabling autonomous AI agents to trade at
          institutional speeds while bound by decentralized safety charters stored on ENS.
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const colors = getColorClasses(step.color);

          return (
            <Card
              key={index}
              className={`p-8 border-2 ${colors.border} hover:${colors.glow} transition-all duration-300`}
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 mx-auto`}
              >
                <Icon className={`w-10 h-10 ${colors.text}`} />
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{step.title}</h3>
                <p className="text-sm text-terminal-muted font-mono">{step.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-terminal-text text-sm leading-relaxed mb-6 text-center">
                {step.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {step.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                    <span className="text-sm text-terminal-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-terminal-border" />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-terminal-text text-center mb-8">
          Key Differentiators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:border-accent-primary/50 transition-all">
              <h3 className="text-lg font-bold text-terminal-text mb-2">{benefit.title}</h3>
              <p className="text-sm text-terminal-muted">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Card className="p-12 bg-gradient-to-br from-cyan-500/10 to-orange-500/10 border-2 border-accent-primary/30">
          <h2 className="text-3xl font-bold text-terminal-text mb-4">Ready to Get Started?</h2>
          <p className="text-terminal-muted mb-8 max-w-2xl mx-auto">
            Create your first AI trading agent and experience institutional-grade trading with
            decentralized compliance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/')}
            >
              Create Your First Agent
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/passport')}
            >
              View Agent Passport
            </Button>
          </div>
        </Card>
      </div>

      {/* Technical Stack */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-terminal-text text-center mb-8">
          Technical Architecture
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Identity', value: 'ENS Subnames' },
            { label: 'Execution', value: 'Yellow Network' },
            { label: 'Settlement', value: 'ClearSync' },
            { label: 'Compliance', value: 'AstraResolver' },
          ].map((item, index) => (
            <Card key={index} className="p-4 text-center">
              <div className="text-xs text-terminal-muted mb-1 font-mono uppercase">
                {item.label}
              </div>
              <div className="text-sm font-bold text-terminal-text">{item.value}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
