import getTransactions from './walletData/getTransactions.js';
import getTxAndFee from './walletData/getTxAndFee.js';
import getBalance from './walletData/getBalance.js';
import getActivity from './walletData/getActivity.js';
import getBridge from './walletData/getBridge.js';
import getVolume from './walletData/getVolume.js';
import getTokenPrice from './helpers/getTokenPrice.js';
import { Months } from './helpers/constants.js';
import getWeeksInThisMonth from './walletData/getWeeksInThisMonth.js';

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

    const { transactions, transfers, contracts, domain } = await getTransactions(
      address,
      tokensPrice.starkgate,
    );
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
      witm,
      transactions: gropuedTransasctions,
      contracts,
      domain,
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
      domain: '-',
      result: 'error',
    };
  }
}
