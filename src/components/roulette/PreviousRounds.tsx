import React from 'react';

type Round = {
  number: number;
  type: 'red' | 'black' | 'green';
  timestamp: number;
};

type PreviousRoundsProps = {
  rounds: Round[];
};

const RoundBox: React.FC<{ round: Round }> = ({ round }) => (
  <div 
    className={`
      w-8 h-8 rounded-lg flex items-center justify-center relative
      ${round.type === 'red' ? 'bg-[#F95146]' : 
        round.type === 'black' ? 'bg-[#2D3035]' : 
        'bg-[#00C74D]'
      }
      before:content-[''] 
      before:absolute 
      before:inset-0
      before:bg-gradient-to-b 
      before:from-white/10
      before:to-transparent
      hover:scale-105 transition-transform
      cursor-pointer
      group
    `}
    title={`Round #${round.number} - ${new Date(round.timestamp).toLocaleTimeString()}`}
  >
    <span className="text-white text-sm font-bold relative z-10">
      {round.number}
    </span>
  </div>
);

export const PreviousRounds: React.FC<PreviousRoundsProps> = ({ rounds }) => {
  const stats = rounds.reduce((acc, round) => {
    acc[round.type] = (acc[round.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-[#1B2028]/80 backdrop-blur-md rounded-lg px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-white font-bold">Previous Rounds</h2>
        <span className="text-white/60 text-sm">Last 100</span>
        <div className="flex items-center gap-3 border-l border-white/10 pl-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F95146]"></div>
            <span className="text-white/60 text-sm">{stats.red || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2D3035] border border-white/10"></div>
            <span className="text-white/60 text-sm">{stats.black || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00C74D]"></div>
            <span className="text-white/60 text-sm">{stats.green || 0}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto">
        {rounds.map((round, index) => (
          <RoundBox key={round.timestamp + index} round={round} />
        ))}
      </div>
    </div>
  );
};