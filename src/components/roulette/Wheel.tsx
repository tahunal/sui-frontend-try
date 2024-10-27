import React from 'react';
import { Row } from './Row';

type WheelProps = {
  wheelRef: React.RefObject<HTMLDivElement>;
  winningNumber?: number;
};

export const Wheel: React.FC<WheelProps> = ({ wheelRef, winningNumber }) => (
  <div className="relative flex justify-center w-full overflow-hidden">
    <div className="w-[3px] bg-gray-500 absolute left-1/2 h-full transform -translate-x-1/2 z-10" />
    <div 
      ref={wheelRef}
      className="flex"
    >
      {Array(29).fill(null).map((_, i) => (
        <Row key={i} winningNumber={winningNumber} />
      ))}
    </div>
  </div>
);