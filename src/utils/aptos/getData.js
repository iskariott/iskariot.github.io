import { fetchBalances, fetchTxs } from './fetchData';
import { formateTokenValue, getWeekOfMonth } from '../common';

export const getBalances = async (address, aptPrice) => {
  const filterSymbol = ['APT', 'USDT', 'USDC', 'DAI'];
  const balances = {};
  let total = 0;
  try {
    const balancesData = await fetchBalances(address);
    Object.values(balancesData).forEach((balance) => {
      if (balance.coin_info) {
        if (filterSymbol.includes(balance.coin_info.symbol)) {
          let tmp = formateTokenValue(balance.balance, balance.coin_info.decimals);
          if (balance.coin_info.symbol === 'APT') tmp *= aptPrice;
          total += tmp;
          balances[balance.coin_info.symbol] = '$' + tmp.toFixed(2);
        }
      }
    });
    return { balances, total: '$' + total.toFixed(2) };
  } catch (e) {
    throw e;
  }
};

export const getTxs = async (address, aptPrice) => {
  try {
    const txsData = await fetchTxs(address);
    const uniqueDays = new Set();
    const uniqueWeeks = new Set();
    const uniqueMonths = new Set();
    const witm = new Set();
    let totalFee = 0;

    const currMonth = new Date().getMonth();
    Object.values(txsData).forEach((tx) => {
      const timstamp = parseInt(tx.time_microseconds / 1000000) * 1000;
      const date = new Date(timstamp);
      if (currMonth === date.getMonth()) witm.add(getWeekOfMonth(date));
      uniqueDays.add(date.toDateString());
      uniqueWeeks.add(date.getFullYear() + '-' + date.getMonth() + '-' + getWeekOfMonth(date));
      uniqueMonths.add(date.getFullYear() + '-' + date.getMonth());
      totalFee += parseInt(tx.gas_used) / Math.pow(10, 6);
    });
    return {
      mwd: uniqueMonths.size + '/' + uniqueWeeks.size + '/' + uniqueDays.size,
      totalFee: '$' + (totalFee * aptPrice).toFixed(2),
      witm: witm.size,
      txsCount: txsData.length,
    };
  } catch (e) {
    throw e;
  }
};
