import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from '@mysten/sui/client';

export const CONTRACT = {
  PACKAGE_ID: '0x5b1b1b12d189da9eaf5b7b3c5c8acb4e6621ed3e5def1de72f3f2894ce5f6c86',
  TREASURY_ID: '0xe0efceccb6bdd9e65ad54378dc298a9ffcd3036ccd4e42b0b0a2cf30a6238328',
  RANDOM_ID: '0x8',
  MODULE: 'game',
  MINIMUM_BET: 100_000_000n, // 0.1 SUI in MIST
  COLORS: {
    GREEN: 0,
    BLACK: 1,
    RED: 2
  },
  MULTIPLIERS: {
    GREEN: 1400, // 14x
    BLACK: 200,  // 2x
    RED: 200     // 2x
  }
};

export async function playGame(
  client: SuiClient,
  address: string,
  number: number,
  betType: number,
  amountInMist: bigint
) {
  if (amountInMist < CONTRACT.MINIMUM_BET) {
    throw new Error('Minimum bet is 0.1 SUI');
  }

  const { data: coins } = await client.getCoins({
    owner: address,
    coinType: '0x2::sui::SUI'
  });

  const coin = coins.find(c => BigInt(c.balance) >= amountInMist);
  if (!coin) {
    throw new Error('Insufficient balance');
  }

  const tx = new Transaction();
  
  tx.moveCall({
    target: `${CONTRACT.PACKAGE_ID}::${CONTRACT.MODULE}::play_game_with_gas`,
    arguments: [
      tx.pure.address(CONTRACT.TREASURY_ID),
      tx.pure.address(CONTRACT.RANDOM_ID),
      tx.pure.u64(betType),
      tx.pure.u64(amountInMist),
      tx.object(coin.coinObjectId)
    ],
    gasBudget: 100000000
  });

  return tx;
}