import React from 'react';
import { ConnectButton } from '../wallet/ConnectButton';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#1B2028]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-white font-bold text-xl">Sui Roulette</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">Play</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Leaderboard</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">History</a>
          </nav>
        </div>

        {/* Wallet Connection */}
        <ConnectButton />
      </div>
    </header>
  );
};