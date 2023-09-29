import axios from 'axios';

export default async function getTokenPrice(token) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`;
  try {
    const response = await axios.get(url);
    return response.data[token].usd;
  } catch (error) {
    console.error('Error fetching token prices:', error.message);
    return null;
  }
}
