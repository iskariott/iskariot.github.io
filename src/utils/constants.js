export const Months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const Tokens = {
  eth: 'ethereum',
  usdt: 'tether',
  dai: 'dai',
  usdc: 'usd-coin',
  wbtc: 'wrapped-bitcoin',
};

export const Columns = [
  // { id: 'update', label: '', align: 'center' },
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
    label: 'M/W/D',
    align: 'center',
  },
  {
    id: 'contract',
    label: 'Contracts',
    align: 'center',
  },
  {
    id: 'fee',
    label: 'Fee',
    align: 'center',
  },
  {
    id: 'witm',
    label: 'WiTM',
    hint: 'Active weeks in this month',
    align: 'center',
  },
];
