import React from 'react';
import { RouletteWheel } from './components/RouletteWheel';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WalletProvider } from './providers/WalletProvider';
import '@mysten/dapp-kit/dist/index.css';

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-[#191B28] flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <RouletteWheel />
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
}

export default App;