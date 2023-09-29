export const Months = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const Tokens = {
  eth: 'ethereum',
  usdt: 'tether',
  dai: 'dai',
  usdc: 'usd-coin',
  wbtc: 'wrapped-bitcoin',
};

export const Columns = [
  // { id: 'details', label: '', width: '10px', align: 'center' },
  { id: 'number', label: '№', align: 'center' },
  { id: 'label', label: 'Label', align: 'center' },
  {
    id: 'balance',
    label: 'Balance',
    align: 'center',
  },
  {
    id: 'offbridge',
    label: 'OffBridge',
    align: 'center',
  },
  {
    id: 'volume',
    label: 'Volume',
    align: 'center',
  },
  {
    id: 'txs',
    label: 'Txs',
    align: 'center',
  },
  {
    id: 'mwd',
    label: 'M/W',
    align: 'center',
  },
  {
    id: 'fee',
    label: 'Fee',
    align: 'center',
  },
  {
    id: 'currActWeeks',
    label: 'Active Weeks in Month',
    align: 'center',
  },
];
