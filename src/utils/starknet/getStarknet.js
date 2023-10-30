import { getBalances, getTransfers, getTxs } from './getData';

export default async function getStarknet(address, ethPrice) {
  try {
    const { totalFee, txCount, mwd, witm } = await getTxs(address, ethPrice);
    const { bridgeTo, bridgeFrom, volume, protocols, uniqueContracts } = await getTransfers(
      address,
      ethPrice,
    );
    const { balances, total } = await getBalances(address);
    return {
      ETH: balances['ETH'] || 0,
      WETH: balances['WETH'] || 0,
      USDC: balances['USDC'] || 0,
      USDT: balances['USDT'] || 0,
      totalBalance: total,
      txCount,
      totalFee,
      mwd,
      bridgeFrom,
      bridgeTo,
      volume,
      uniqueContracts,
      witm,
      protocols,
      result: true,
    };
  } catch (e) {
    console.log('error: ', e);
    return {
      balances: { ETH: '-' },
      txCount: '-',
      totalFee: '-',
      mwd: '-',
      bridgeFrom: '-',
      bridgeTo: '-',
      volume: '-',
      witm: '-',
      protocols: {},
      result: false,
    };
  }
}
