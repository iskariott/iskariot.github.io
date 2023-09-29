import axios from 'axios';

export default async function getTokenBalance(address) {
  try {
    const response = await axios.get(`https://voyager.online/api/contract/${address}/balances`);
    let tokenBalance = {};
    for (const token in response.data) {
      tokenBalance[response.data[token].symbol] = response.data[token].usdFormattedBalance;
    }
    return tokenBalance.ETH;
  } catch (e) {
    console.log(e);
    return {
      ETH: '-',
      DAI: '-',
      USDC: '-',
      USDT: '-',
      WBTC: '-',
    };
  }
}
