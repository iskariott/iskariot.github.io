import axios from 'axios';

const apiUrl = 'https://api.apscan.io';

export async function fetchBalances(address) {
  try {
    const resp = await axios.get(apiUrl + '/accounts?address=eq.' + address);
    return resp.data[0].all_balances;
  } catch (e) {
    console.error('fetchBalances error: ', e);
    throw e;
  }
}

export async function fetchTxs(address) {
  let startRange = 0,
    endRange = 50;
  let txs = [];
  let isAllTxCollected = false;

  try {
    while (!isAllTxCollected) {
      const response = await axios.get(apiUrl + '/user_transactions?sender=eq.' + address, {
        headers: {
          range: `${startRange}-${endRange}`,
        },
      });
      let items = response.data;
      if (items.length) {
        Object.values(items).forEach((tx) => {
          txs.push(tx);
        });
        startRange = startRange + 50;
        endRange = endRange + 50;
      } else {
        isAllTxCollected = true;
      }
    }
    return txs;
  } catch (e) {
    console.error('fetchTxs error: ', e);
    throw e;
  }
}

export async function fetchTransfers(address) {}
