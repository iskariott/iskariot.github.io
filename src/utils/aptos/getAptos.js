import { getBalances, getTxs } from './getData';

export default async function getAptos(address, aptPrice) {
  try {
    const txs = await getTxs(address, aptPrice);
    const { balances, total } = await getBalances(address, aptPrice);
    return {
      totalBalance: total,
      APT: balances.APT || 0,
      USDT: balances.USDT || 0,
      USDC: balances.USDC || 0,
      txCount: txs.txsCount,
      totalFee: txs.totalFee,
      mwd: txs.mwd,
      witm: txs.witm,
      result: true,
    };
  } catch (e) {
    return {
      balances: { APT: '-', USDC: '-', USDT: '-' },
      totalBalance: 0,
      txCount: '-',
      totalFee: 0,
      mwd: '-',
      witm: '-',
      result: false,
    };
  }
}
