import { getBalances, getTxs } from './getData';

export default async function getAptos(address, aptPrice) {
  try {
    const txs = await getTxs(address, aptPrice);
    const { balances, total } = await getBalances(address, aptPrice);
    return {
      totalBalance: total,
      balances: balances,
      txCount: txs.txsCount,
      totalFee: txs.totalFee,
      mwd: txs.mwd,
      witm: txs.witm,
      result: true,
    };
  } catch (e) {
    return {
      balances: { APT: '-', USDC: '-', USDT: '-', DAI: '-' },
      totalBalance: '-',
      txCount: '-',
      totalFee: '-',
      mwd: '-',
      witm: '-',
      result: false,
    };
  }
}
