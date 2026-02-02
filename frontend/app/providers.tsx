'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia, mainnet, base, arbitrum, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const config = getDefaultConfig({
    appName: 'ASTRA Terminal',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
    chains: [sepolia, mainnet, base, arbitrum, polygon],
    ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: '#00FFFF',
                        accentColorForeground: '#0C0C0E',
                        borderRadius: 'medium',
                        fontStack: 'system',
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
