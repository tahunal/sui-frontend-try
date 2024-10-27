import { useCurrentAccount, useSuiClient, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { useState } from 'react';
import { playGame, CONTRACT } from '../services/suiContract';

export function useRoulette() {
  const [isProcessing, setIsProcessing] = useState(false);
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const placeBet = async (
    number: number,
    betType: 'red' | 'black' | 'green',
    amount: number
  ) => {
    if (!account) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsProcessing(true);
      
      // Convert bet type to contract color codes
      const betTypeNumber = betType === 'red' ? CONTRACT.COLORS.RED : 
                          betType === 'black' ? CONTRACT.COLORS.BLACK : 
                          CONTRACT.COLORS.GREEN;
      
      // Convert SUI to MIST (1 SUI = 1_000_000_000 MIST)
      const amountInMist = BigInt(Math.floor(amount * 1_000_000_000));
      
      // Create transaction with automatic coin selection
      const transaction = await playGame(
        client,
        account.address,
        number,
        betTypeNumber,
        amountInMist
      );

      // Sign and execute transaction
      const result = await signAndExecute({
        transaction,
        options: {
          showEffects: true,
          showObjectChanges: true,
          showEvents: true,
          showInput: true,
          showBalanceChanges: true
        },
      });

      console.log('Transaction result:', result);
      return result;
    } catch (error: any) {
      console.error('Error placing bet:', error);
      const errorMessage = error.message || 'Failed to place bet';
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    placeBet,
    isProcessing
  };
}