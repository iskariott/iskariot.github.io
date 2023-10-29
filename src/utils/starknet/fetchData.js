import axios from 'axios';

const apiUrl = 'https://voyager.online/api';

export async function fetchBalances(address) {
  try {
    return await axios.get(apiUrl + '/contract/' + address + '/balances').then((r) => r.data);
  } catch (e) {
    console.log('fetchBalances error: ');
    throw e;
  }
}

export async function fetchTxs(address) {
  const config = {
    params: {
      to: address,
      p: 1,
      ps: 100,
    },
  };
  const txs = [];
  let isAllTxCollected = false;
  try {
    while (!isAllTxCollected) {
      await axios.get(apiUrl + '/txns', config).then(async (response) => {
        let items = response.data.items;
        let lastPage = response.data.lastPage;
        Object.values(items).forEach((tx) => {
          txs.push(tx);
        });

        if (config.params.p === lastPage) {
          isAllTxCollected = true;
        } else {
          config.params.p++;
        }
      });
    }
    return txs;
  } catch (e) {
    console.log('fetchTxs error!');
    throw e;
  }
}

export async function fetchTransfers(address) {
  const transferConfig = {
    params: {
      p: 1,
      ps: 100,
    },
  };
  let isAllTransfersCollected = false;
  let transfers = [];
  try {
    while (!isAllTransfersCollected) {
      await axios
        .get(apiUrl + '/contract/' + address + '/transfers', transferConfig)
        .then(async (response) => {
          let items = response.data.items;
          let lastPage = response.data.lastPage;
          Object.values(items).forEach((transfer) => {
            transfers.push(transfer);
          });

          if (transferConfig.params.p === lastPage) {
            isAllTransfersCollected = true;
          } else {
            transferConfig.params.p++;
          }
        });
    }
    return transfers;
  } catch (e) {
    console.log('fetchTransfers error!');
    throw e;
  }
}
