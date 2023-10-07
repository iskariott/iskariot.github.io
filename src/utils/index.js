import getTransactions from './getTransactions.js';
import getTxAndFee from './getTxAndFee.js';
import getBalance from './getBalance.js';
import getActivity from './getActivity.js';
import getBridge from './getBridge.js';
import getVolume from './getVolume.js';
import getTokenPrice from './getTokenPrice.js';
import { Months } from './constants.js';
import getWeeksInThisMonth from './getWeeksInThisMonth.js';

function groupByDate(transactions) {
  const grouped = transactions.reduce((result, obj) => {
    const date = new Date(obj.timestamp * 1000);
    const dateKey = Months[date.getMonth() + 1] + ' ' + date.getUTCFullYear();

    if (!result[dateKey]) {
      result[dateKey] = [];
    }

    // Push the object to the corresponding date array
    result[dateKey].push({
      contract_name: obj.contract_name,
      fee: '$' + obj.fee,
      date: obj.date,
      hash: obj.transaction_hash,
      time: date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds(),
    });

    return result;
  }, {});
  return Object.keys(grouped).map((itm) => ({
    [itm]: grouped[itm],
  }));
}

export default async function getStark(address) {
  try {
    const tokensPrice = await getTokenPrice();

    const { transactions, transfers } = await getTransactions(address, tokensPrice.starkgate);
    const witm = getWeeksInThisMonth(transactions);
    const activity = getActivity(address, transactions);
    const { tx, fee } = getTxAndFee(transactions, tokensPrice.eth);
    const balance = await getBalance(address, tokensPrice);
    const bridge = getBridge(transfers, tokensPrice.starkgate);
    const volume = getVolume(transactions);
    const gropuedTransasctions = groupByDate(transactions);

    return {
      balance,
      tx,
      fee,
      activity,
      bridge,
      volume,
      witm: witm,
      transactions: gropuedTransasctions,
    };
  } catch (e) {
    return {
      balance: { tokens: '-', total: '-' },
      tx: '-',
      fee: '-',
      activity: { monthActivity: '-', weekActivity: '-', dayActivity: '-', contractActivity: '-' },
      bridge: '-',
      volume: '-',
      transactions: [],
      witm: '-',
      result: 'error',
    };
  }
}
