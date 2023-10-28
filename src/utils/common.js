import axios from 'axios';

export async function getTokensPrice(token) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`;
  try {
    const response = await axios.get(url);
    return response.data[token].usd;
  } catch (e) {
    console.error('getTokenPrice error:', e.message);
    throw e;
  }
}

export function formateTokenValue(value, decimal) {
  return parseFloat((parseInt(value) / 10 ** decimal).toFixed(4));
}

export function getWeekOfMonth(t) {
  const date = new Date(t);
  // let adjustedDate = date.getDate() + date.getDay();
  // let prefixes = ['0', '1', '2', '3', '4', '5'];
  // return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
  const month = date.getMonth();
  const startDate = new Date(date.getFullYear(), month, 1);
  const dayOfWeekOnFirst = startDate.getDay();
  const day = date.getDate();

  if (dayOfWeekOnFirst === 0) {
    return Math.ceil(day / 7);
  } else {
    return Math.ceil((day + dayOfWeekOnFirst) / 7);
  }
}

export default function formateDateToDDMMYY(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Month is zero-based
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

export function getTableObject(
  number,
  label,
  balance,
  starkgate,
  volume,
  txs,
  fee,
  activity,
  witm,
  domain,
  address,
  transactions,
  contracts,
  result,
) {
  return {
    number,
    label,
    balance: balance.total,
    starkgate,
    volume,
    txs,
    fee,
    contractsCount: activity.contractActivity,
    mwd: `${activity.monthActivity}/${activity.weekActivity}/${activity.dayActivity}`,
    witm,
    domain,
    collapse: {
      address,
      balance: balance.tokens,
      transactions,
      contracts,
    },
    result,
  };
}
