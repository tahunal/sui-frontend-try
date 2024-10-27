import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B2028]/80 backdrop-blur-md border-t border-white/5 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-xl">Sui Roulette</span>
            </div>
            <p className="text-white/60 text-sm">
              Experience the thrill of decentralized gaming on the Sui network.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">How to Play</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Discord</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Twitter</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Telegram</a></li>
            </ul>
          </div>

          {/* Network Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Network Status</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-white/60">Sui Mainnet Connected</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2024 Sui Roulette. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};