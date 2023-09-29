import axios from 'axios';

export async function getBridge(address, ethPrice) {
  let page = 1;
  try {
    let bridgeList = [];
    while (true) {
      const response = await axios.get(
        `https://voyager.online/api/contract/${address}/bridgeTransactions?ps=50&p=${page}`,
      );
      bridgeList = [...bridgeList, ...response.data['items']];
      if (
        response.data['lastPage'] === page ||
        response.data['lastPage'] === 0 ||
        response.data['items'].length === 0
      ) {
        break;
      }
      page++;
    }

    let bridgeInteraction = 0;
    let bridgeVolume = 0;
    bridgeList.forEach((bridge) => {
      const { token_id, amount, type } = bridge;
      if (type === 0) {
        bridgeInteraction++;
        bridgeVolume += amount * ethPrice[token_id];
      }
    });
    return {
      bridgeInteraction,
      bridgeVolume: Number(bridgeVolume.toFixed(2)),
    };
  } catch (e) {
    console.log(e);
    return {
      bridgeInteraction: '-',
      bridgeVolume: '-',
    };
  }
}
