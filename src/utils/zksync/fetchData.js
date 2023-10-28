import axios from 'axios';

const apiUrl = 'https://block-explorer-api.mainnet.zksync.io';

export async function fetchBalances(address) {
  try {
    const data = await axios
      .get(apiUrl + '/address/' + address)
      .then((response) => response.data.balances);
    return data;
  } catch (e) {
    console.log('fetchBalances error: ', e);
    throw e;
  }
}

export async function fetchTxs(address) {
  let txs = [];
  let page = 1;
  let isAllTxCollected = false;
  let tries = 0;
  try {
    while (!isAllTxCollected) {
      try {
        await axios
          .get(apiUrl + '/transactions', {
            params: {
              address: address,
              limit: 100,
              page: page,
            },
          })
          .then((response) => {
            let items = response.data.items;
            let meta = response.data.meta;
            Object.values(items).forEach((tx) => {
              if (tx.from.toLowerCase() === address.toLowerCase()) {
                txs.push(tx);
              }
            });

            if (meta.currentPage === meta.totalPages || meta.totalItems == 0) {
              isAllTxCollected = true;
            } else {
              page++;
            }
          });
      } catch (e) {
        tries++;
        if (tries === 3) {
          isAllTxCollected = true;
          throw e;
        }
      }
    }
  } catch (e) {
    console.log('fetchTxs error: ', e);
    throw e;
  }
  return txs;
}

export async function fetchTransfers(address) {
  let page = 1;
  let isAllTransfersCollected = false;
  let transfers = [];
  try {
    while (!isAllTransfersCollected) {
      await axios
        .get(apiUrl + '/address/' + address + '/transfers', {
          params: {
            limit: 100,
            page: page,
          },
        })
        .then(async (response) => {
          transfers.push(...response.data.items);
          let meta = response.data.meta;
          if (meta.currentPage === meta.totalPages || meta.totalItems == 0) {
            isAllTransfersCollected = true;
          } else {
            page++;
          }
        });
    }
    return transfers;
  } catch (e) {
    console.log('fetchTransfers error: ', e);
    return [];
  }
}

export async function fetchLite(address) {
  try {
    const liteData = await axios.post('https://api.zksync.io/jsrpc', {
      'id': 1,
      'jsonrpc': '2.0',
      'method': 'account_info',
      'params': [address],
    });

    return liteData;
  } catch (e) {
    console.log('fetchLite error: ', e);
    throw e;
  }
}
