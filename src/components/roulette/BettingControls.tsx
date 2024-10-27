import React, { useState } from 'react';
import { useRoulette } from '../../hooks/useRoulette';
import { useCurrentAccount } from '@mysten/dapp-kit';

type BettingControlsProps = {
  onBet: (amount: number, type: 'red' | 'black' | 'green') => void;
  winningType?: 'red' | 'black' | 'green';
};

export const BettingControls: React.FC<BettingControlsProps> = ({ onBet, winningType }) => {
  const [betAmount, setBetAmount] = useState(1);
  const { placeBet, isProcessing } = useRoulette();
  const account = useCurrentAccount();

  const handlePlaceBet = async (type: 'red' | 'black' | 'green') => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // For red/black we use numbers 1-7 for red and 8-14 for black
      // For green we use 0
      const number = type === 'green' ? 0 : 
                    type === 'red' ? Math.floor(Math.random() * 7) + 1 : 
                    Math.floor(Math.random() * 7) + 8;

      await placeBet(number, type, betAmount);
      onBet(betAmount, type);
    } catch (error) {
      console.error('Error placing bet:', error);
      alert('Failed to place bet. Please try again.');
    }
  };

  const getButtonStyles = (type: 'red' | 'black' | 'green') => {
    const isWinning = winningType === type;
    const baseStyles = {
      red: 'bg-[#F95146]',
      green: 'bg-[#00C74D]',
      black: 'bg-transparent border-2 border-white/10'
    };
    
    const winningStyles = {
      red: 'animate-pulse shadow-lg shadow-red-500/50',
      green: 'animate-pulse shadow-lg shadow-green-500/50',
      black: 'animate-pulse shadow-lg shadow-white/30'
    };

    return `
      flex items-center justify-between rounded-lg px-6 py-4 text-white 
      transition-all duration-300
      ${baseStyles[type]}
      ${isWinning ? winningStyles[type] : type === 'black' ? 'hover:bg-white/5' : 'hover:opacity-90'}
      ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
    `;
  };

  return (
    <div className="space-y-4">
      {/* Bet Amount Input */}
      <div className="flex items-center gap-4 justify-center mb-8">
        <label className="text-white/60">Bet Amount (SUI):</label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="w-32 p-2 bg-[#1B2028] rounded-lg text-white border border-white/10 focus:outline-none focus:border-blue-500"
          disabled={isProcessing}
        />
      </div>

      {/* Betting Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => handlePlaceBet('red')}
          className={getButtonStyles('red')}
          disabled={isProcessing}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M19 5L5 19M5 5l14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-lg">BET RED</span>
          </div>
          <span className="font-bold">WIN 2X</span>
        </button>

        <button
          onClick={() => handlePlaceBet('green')}
          className={getButtonStyles('green')}
          disabled={isProcessing}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-lg">BET GREEN</span>
          </div>
          <span className="font-bold">WIN 14X</span>
        </button>

        <button
          onClick={() => handlePlaceBet('black')}
          className={getButtonStyles('black')}
          disabled={isProcessing}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="font-bold text-lg">BET BLACK</span>
          </div>
          <span className="font-bold">WIN 2X</span>
        </button>
      </div>

      {isProcessing && (
        <div className="text-center text-white/60 mt-4">
          Processing your bet...
        </div>
      )}
    </div>
  );
};