import axios from 'axios';

export default async function getTokenPrice() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum,wrapped-bitcoin&vs_currencies=usd`;
  try {
    const response = await axios.get(url);
    return {
      eth: response.data['ethereum'].usd,
      wbtc: response.data['wrapped-bitcoin'].usd,
      starkgate: {
        'StarkGate: ETH': response.data['ethereum'].usd,
        'StarkGate: USDT': 1,
        'StarkGate: USDC': 1,
        'StarkGate: DAI': 1,
        'StarkGate: WBTC': response.data['wrapped-bitcoin'].usd,
      },
    };
  } catch (e) {
    console.error('getTokenPrice error:', e.message);
    throw e;
  }
}
