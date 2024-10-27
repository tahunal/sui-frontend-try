import React from 'react';

type ControlsProps = {
  outcome: string;
  onOutcomeChange: (value: string) => void;
  onSpin: () => void;
  disabled: boolean;
};

export const Controls: React.FC<ControlsProps> = ({ 
  outcome, 
  onOutcomeChange, 
  onSpin,
  disabled 
}) => (
  <div className="p-4 flex flex-col items-center gap-4">
    <input
      type="number"
      className="p-3 bg-[#1B2028] rounded-lg text-white border border-white/10 focus:outline-none focus:border-blue-500"
      placeholder="Enter number (0-14)"
      value={outcome}
      onChange={(e) => onOutcomeChange(e.target.value)}
      disabled={disabled}
      min="0"
      max="14"
    />
    <button
      className={`
        bg-gradient-to-r from-blue-500 to-cyan-400 
        text-white px-6 py-3 rounded-lg font-medium 
        transition-all duration-300
        ${disabled ? 
          'opacity-50 cursor-not-allowed' : 
          'hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/20'
        }
      `}
      onClick={onSpin}
      disabled={disabled}
    >
      {disabled ? 'Spinning...' : 'Spin Wheel'}
    </button>
  </div>
);