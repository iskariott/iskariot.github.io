import formateDateToDDMMYY, { formateTokenValue, getWeekOfMonth } from '../common';
import { BalanceSymbol, CONTRACTS, ContractsStr, Months, STABLES, StableSymbol } from './constants';
import { fetchBalances, fetchLite, fetchTransfers, fetchTxs } from './fetchData';

export const getBalances = async (address) => {
  try {
    let total = 0;
    const balances = {};
    const balanceData = await fetchBalances(address);
    balanceData.forEach((itm) => {
      balances[itm.symbol] = itm.usdFormattedBalance;
      total += Number(itm.usdBalance);
    });
    return { balances, total: '$' + total.toFixed(2) };
  } catch (e) {
    throw e;
  }
};

export const getTransfers = async (address, ethPrice) => {
  const uniqueContracts = new Set();
  const contracts = JSON.parse(CONTRACTS);
  let bridgeTo = 0;
  let bridgeFrom = 0;
  let volume = 0;
  const protocols = {};
  try {
    const transfersData = await fetchTransfers(address);
    transfersData.forEach((transfer) => {
      if (transfer.call_name === 'transferFrom') {
        uniqueContracts.add(transfer.transfer_to);
        let contract = contracts.find(
          (protocol) => protocol.address.toLowerCase() === transfer.transfer_to.toLowerCase(),
        );
        if (contract) {
          if (!protocols[contract.name]) {
            protocols[contract.name] = {};
            protocols[contract.name].count = 0;
          }
          protocols[contract.name].count++;
          protocols[contract.name].url = contract.url;

          if (transfer.token_symbol === 'ETH') {
            volume += parseFloat(transfer.transfer_value) * ethPrice;
          }

          if (STABLES.includes(transfer.token_symbol)) {
            volume += parseFloat(transfer.transfer_value);
          }
        }

        if (
          transfer.transfer_from ===
            '0x0000000000000000000000000000000000000000000000000000000000000000' &&
          transfer.call_name === 'permissionedMint'
        ) {
          bridgeTo++;
        }

        if (
          transfer.transfer_from ===
            '0x0000000000000000000000000000000000000000000000000000000000000000' &&
          transfer.call_name === 'permissionedBurn'
        ) {
          bridgeFrom++;
        }
      }
    });

    return {
      bridgeTo,
      bridgeFrom,
      volume: '$' + volume.toFixed(2),
      protocols,
      uniqueContracts: uniqueContracts.size,
    };
  } catch (error) {
    throw error;
  }
};

export const getTxs = async (address, ethPrice) => {
  try {
    const txsData = await fetchTxs(address);
    const txCount = txsData.length;
    const uniqueDays = new Set();
    const uniqueWeeks = new Set();
    const uniqueMonths = new Set();
    const uniqueWeeksInCurMonth = new Set();
    const currMonth = new Date().getMonth();
    let totalFee = 0;

    txsData.forEach((tx) => {
      const date = new Date(tx.timestamp * 1000);
      if (currMonth === date.getMonth())
        uniqueWeeksInCurMonth.add(getWeekOfMonth(tx.timestamp * 1000));
      uniqueDays.add(date.toDateString());
      uniqueWeeks.add(date.getFullYear() + '-' + date.getMonth() + '-' + getWeekOfMonth(date));
      uniqueMonths.add(date.getFullYear() + '-' + date.getMonth());

      const fee = (parseInt(tx.actual_fee) / Math.pow(10, 18)) * ethPrice;
      totalFee += fee;
    });

    return {
      totalFee: '$' + totalFee.toFixed(2),
      txCount,
      mwd: uniqueMonths.size + '/' + uniqueWeeks.size + '/' + uniqueDays.size,
      witm: uniqueWeeksInCurMonth.size,
    };
  } catch (e) {
    throw e;
  }
};
