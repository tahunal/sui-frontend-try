import React from 'react';

export type CardProps = {
  number: number;
  type: 'red' | 'black' | 'green';
  isWinning?: boolean;
};

export const Card: React.FC<CardProps> = ({ number, type, isWinning = false }) => (
  <div className="p-[3px]">
    <div 
      className={`
        h-[75px] w-[75px]
        rounded-2xl flex items-center justify-center 
        relative overflow-visible
        ${type === 'red' ? 'bg-[#F95146]' : 
          type === 'black' ? 'bg-[#2D3035]' : 
          'bg-[#00C74D]'
        }
        transform transition-all duration-500
        ${isWinning ? 'scale-110 z-10' : 'hover:scale-105'}
        before:content-[''] 
        before:absolute 
        before:inset-0
        before:bg-gradient-to-b 
        before:from-white/5
        before:to-transparent
        after:content-['']
        after:absolute
        after:inset-0
        after:bg-gradient-to-t 
        after:from-black/10
        after:to-transparent
        ${isWinning ? 'animate-card-win' : ''}
      `}
    >
      <span className={`
        text-white 
        text-4xl 
        font-bold 
        relative 
        z-10
        drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]
        font-['Titillium_Web']
        tracking-wider
        transition-all duration-300
        ${isWinning ? 'text-5xl' : ''}
      `}>
        {number}
      </span>
    </div>
  </div>
);