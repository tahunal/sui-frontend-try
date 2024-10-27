import React, { useRef, useState, useEffect } from 'react';
import { Controls } from './roulette/Controls';
import { Wheel } from './roulette/Wheel';
import { BettingControls } from './roulette/BettingControls';
import { PreviousRounds } from './roulette/PreviousRounds';

export const RouletteWheel: React.FC = () => {
  const [outcome, setOutcome] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number>();
  const [winningType, setWinningType] = useState<'red' | 'black' | 'green'>();
  const [rounds, setRounds] = useState<Array<{ number: number; type: 'red' | 'black' | 'green'; timestamp: number }>>([]);
  const wheelRef = useRef<HTMLDivElement>(null);
  const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
  const CARD_WIDTH = 81;
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const amplitude = 15;
    const period = 4000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (isSpinning || !wheelRef.current || !shouldAnimate) return;

      const elapsed = timestamp - startTime;
      const position = amplitude * Math.sin((elapsed * 2 * Math.PI) / period);
      
      wheelRef.current.style.transform = `translate3d(${position}px, 0px, 0px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    if (!isSpinning && shouldAnimate) {
      startTime = performance.now();
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isSpinning, shouldAnimate]);

  const getNumberType = (number: number): 'red' | 'black' | 'green' => {
    if (number === 0) return 'green';
    if ([1, 2, 3, 4, 5, 6, 7].includes(number)) return 'red';
    return 'black';
  };

  const handleSpin = () => {
    const roll = parseInt(outcome);
    if (isNaN(roll) || !order.includes(roll)) return;

    setShouldAnimate(false);
    setIsSpinning(true);
    setWinningNumber(undefined);
    setWinningType(undefined);
    
    const position = order.indexOf(roll);
    const rows = 12;
    const randomize = Math.floor(Math.random() * 75) - 75/2;
    const landingPosition = (rows * 15 * CARD_WIDTH) + (position * CARD_WIDTH) + randomize;

    const object = {
      x: Math.floor(Math.random() * 50) / 100,
      y: Math.floor(Math.random() * 20) / 100
    };

    if (wheelRef.current) {
      wheelRef.current.style.transitionTimingFunction = `cubic-bezier(0, ${object.x}, ${object.y}, 1)`;
      wheelRef.current.style.transitionDuration = '6s';
      wheelRef.current.style.transform = `translate3d(-${landingPosition}px, 0px, 0px)`;

      setTimeout(() => {
        if (wheelRef.current) {
          const type = getNumberType(roll);
          setWinningNumber(roll);
          setWinningType(type);
          
          setRounds(prev => {
            const newRounds = [
              { number: roll, type, timestamp: Date.now() },
              ...prev
            ].slice(0, 100);
            return newRounds;
          });

          setTimeout(() => {
            if (wheelRef.current) {
              wheelRef.current.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
              wheelRef.current.style.transitionDuration = '2s';
              wheelRef.current.style.transform = 'translate3d(0px, 0px, 0px)';

              setTimeout(() => {
                setIsSpinning(false);
                setWinningNumber(undefined);
                setWinningType(undefined);
                setOutcome('');
                if (wheelRef.current) {
                  wheelRef.current.style.transitionTimingFunction = '';
                  wheelRef.current.style.transitionDuration = '';
                }
                setShouldAnimate(true);
              }, 2000);
            }
          }, 3000);
        }
      }, 6000);
    }
  };

  return (
    <div className="min-h-screen bg-[#191B28] p-4 space-y-8">
      <PreviousRounds rounds={rounds} />
      <Wheel wheelRef={wheelRef} winningNumber={winningNumber} />
      <Controls 
        outcome={outcome}
        onOutcomeChange={setOutcome}
        onSpin={handleSpin}
        disabled={isSpinning}
      />
      <BettingControls 
        onBet={(amount, type) => console.log(`Placed ${amount} on ${type}`)}
        winningType={winningType}
      />
    </div>
  );
};