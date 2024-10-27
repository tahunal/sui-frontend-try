import { createNetworkConfig, SuiClientProvider, WalletProvider as SuiWalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl('devnet') }
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
        <SuiWalletProvider autoConnect>{children}</SuiWalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}