import { getBalances, getTransfers, getTxs } from './getData';

export default async function getStarknet(address, ethPrice, proxy) {
  try {
    const { totalFee, txCount, mwd, witm } = await getTxs(address, ethPrice, proxy);
    const { bridgeTo, bridgeFrom, volume, protocols, uniqueContracts } = await getTransfers(
      address,
      ethPrice,
      proxy,
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
      balances: { ETH: '-', WETH: '-', USDC: '-', USDT: '-' },
      txCount: '-',
      totalFee: 0,
      totalBalance: 0,
      mwd: '-',
      bridgeFrom: '-',
      bridgeTo: '-',
      volume: 0,
      witm: '-',
      protocols: {},
      result: false,
    };
  }
}
