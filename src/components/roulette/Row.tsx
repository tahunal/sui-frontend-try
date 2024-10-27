import React from 'react';
import { Card } from './Card';

type RowProps = {
  winningNumber?: number;
};

export const Row: React.FC<RowProps> = ({ winningNumber }) => (
  <div className="flex">
    <Card number={1} type="red" isWinning={winningNumber === 1} />
    <Card number={14} type="black" isWinning={winningNumber === 14} />
    <Card number={2} type="red" isWinning={winningNumber === 2} />
    <Card number={13} type="black" isWinning={winningNumber === 13} />
    <Card number={3} type="red" isWinning={winningNumber === 3} />
    <Card number={12} type="black" isWinning={winningNumber === 12} />
    <Card number={4} type="red" isWinning={winningNumber === 4} />
    <Card number={0} type="green" isWinning={winningNumber === 0} />
    <Card number={11} type="black" isWinning={winningNumber === 11} />
    <Card number={5} type="red" isWinning={winningNumber === 5} />
    <Card number={10} type="black" isWinning={winningNumber === 10} />
    <Card number={6} type="red" isWinning={winningNumber === 6} />
    <Card number={9} type="black" isWinning={winningNumber === 9} />
    <Card number={7} type="red" isWinning={winningNumber === 7} />
    <Card number={8} type="black" isWinning={winningNumber === 8} />
  </div>
);