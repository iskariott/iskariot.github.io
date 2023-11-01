import formateDateToDDMMYY, {
  formateContracts,
  formateTokenValue,
  getWeekOfMonth,
} from '../common';
import { BalanceSymbol, ContractsStr, Months, StableSymbol } from './constants';
import { fetchBalances, fetchLite, fetchTransfers, fetchTxs } from './fetchData';

export const getBalances = async (address, ethPrice) => {
  const balances = {};
  let total = 0;
  try {
    const balancesData = await fetchBalances(address);
    Object.values(balancesData).forEach((bal) => {
      if (bal.token) {
        if (BalanceSymbol.includes(bal.token.symbol)) {
          let tmp = formateTokenValue(bal.balance, bal.token.decimals);
          if (bal.token.symbol === 'ETH' || bal.token.symbol === 'WETH') {
            tmp *= ethPrice;
            total += tmp;
            balances[bal.token.symbol] = '$' + tmp.toFixed(2);
          } else {
            balances[bal.token.symbol] = '$' + tmp.toFixed(2);
          }
        }
      }
    });
    return { balances, total: total };
  } catch (e) {
    throw e;
  }
};

export const getTransfers = async (address, ethPrice) => {
  try {
    const transfersData = await fetchTransfers(address);
    let bridgeTo = 0;
    let bridgeFrom = 0;
    let volume = 0;

    for (const tr of transfersData) {
      if (
        tr.type === 'deposit' &&
        tr.from.toLowerCase() === address.toLowerCase() &&
        tr.to.toLowerCase() === address.toLowerCase()
      ) {
        bridgeTo++;
      }

      if (
        tr.type === 'withdrawal' &&
        tr.from.toLowerCase() === address.toLowerCase() &&
        tr.to.toLowerCase() === address.toLowerCase()
      ) {
        bridgeFrom++;
      }

      if (tr.token && tr.from.toLowerCase() === address.toLowerCase()) {
        if (StableSymbol.includes(tr.token.symbol)) {
          let amount = parseInt(tr.amount) / Math.pow(10, tr.token.decimals);
          if (tr.token.symbol.includes('ETH')) {
            volume += amount * ethPrice;
          } else {
            volume += amount;
          }
        }
      }
    }
    return { bridgeTo, bridgeFrom, volume };
  } catch (e) {
    throw e;
  }
};

export const getTxs = async (address, ethPrice) => {
  try {
    const txsData = await fetchTxs(address);
    const contracts = JSON.parse(ContractsStr);
    const uniqueDays = new Set();
    const uniqueWeeks = new Set();
    const uniqueMonths = new Set();
    const uniqueContracts = new Set();
    const uniqueWeeksInCurMonth = new Set();
    const currMonth = new Date().getMonth();
    let txCount = 0;
    let totalFee = 0;
    // const protocols = {};
    const objGroupedTrans = {};

    txsData.forEach((tx) => {
      const date = new Date(tx.receivedAt);
      if (currMonth === date.getMonth()) uniqueWeeksInCurMonth.add(getWeekOfMonth(tx.receivedAt));
      uniqueDays.add(date.toDateString());
      uniqueWeeks.add(date.getFullYear() + '-' + date.getMonth() + '-' + getWeekOfMonth(date));
      uniqueMonths.add(date.getFullYear() + '-' + date.getMonth());
      uniqueContracts.add(tx.to);
      txCount++;
      const fee = (parseInt(tx.fee) / Math.pow(10, 18)) * ethPrice;
      totalFee += fee;

      let idx = contracts.findIndex(
        (contract) => contract.address.toLowerCase() === tx.to.toLowerCase(),
      );
      if (idx !== -1) {
        contracts[idx].count++;
      }
      const dateKey = Months[date.getMonth() + 1] + ' ' + date.getUTCFullYear();
      if (!objGroupedTrans[dateKey]) {
        objGroupedTrans[dateKey] = [];
      }
      objGroupedTrans[dateKey].push({
        contract_name: contracts[idx]?.name || '-',
        fee: '$' + fee.toFixed(2),
        date: formateDateToDDMMYY(date),
        hash: tx.hash,
        time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      });
    });

    return {
      totalFee: totalFee,
      txCount,
      uniqueContracts: uniqueContracts.size,
      mwd: uniqueMonths.size + '/' + uniqueWeeks.size + '/' + uniqueDays.size,
      witm: uniqueWeeksInCurMonth.size,
      protocols: formateContracts(contracts),
      transactions: Object.keys(objGroupedTrans).map((itm) => ({ [itm]: objGroupedTrans[itm] })),
    };
  } catch (e) {
    throw e;
  }
};

export const getLite = async (address, ethPrice) => {
  let balance = 0;
  let txs = 0;
  try {
    const liteData = await fetchLite(address, ethPrice);
    const bal = liteData.data.result?.committed?.balances?.ETH || 0;
    if (bal) balance = parseFloat((parseInt(bal) / 10 ** 18).toFixed(4)) * ethPrice;
    txs = parseInt(liteData.data.result?.committed?.nonce || 0);
    return { balance, txs };
  } catch (e) {
    throw e;
  }
};
