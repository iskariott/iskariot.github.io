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
  { id: 'number', label: '№', align: 'center' },
  { id: 'label', label: 'Label', align: 'center' },
  {
    id: 'balance',
    label: 'Balance',
    align: 'center',
  },
  {
    id: 'starkgate',
    label: 'Starkgate',
    align: 'center',
  },
  {
    id: 'domain',
    label: 'Domain',
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
    id: 'contractsCount',
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

export const getContracts = () => [
  {
    name: 'Dmail Network',
    address: '0x0454f0bd015e730e5adbb4f080b075fdbf55654ff41ee336203aa2e1ac4d4309',
    link: 'https://mail.dmail.ai/',
    count: 0,
    img: 'dmail.jpg',
  },
  {
    name: 'mySwap: AMM Swap',
    address: '0x010884171baf1914edc28d7afb619b40a4051cfae78a094a55d230f19e944a28',
    link: 'https://www.myswap.xyz/',
    count: 0,
    img: 'myswap.jpg',
  },
  {
    name: 'Orbiter Finance',
    address: '0x0173f81c529191726c6e7287e24626fe24760ac44dae2a1f7e02080230f8458b',
    link: 'https://www.orbiter.finance/',
    count: 0,
    img: 'orbiter.jpg',
  },
  {
    name: 'zkLend: Market',
    address: '0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05',
    link: 'https://app.zklend.com/',
    count: 0,
    img: 'zklend.jpg',
  },
  {
    name: 'Starknet.id: Identity NFT',
    address: '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af',
    link: 'https://app.starknet.id/identities',
    count: 0,
    img: 'starknetId.jpg',
  },
  {
    name: 'JediSwap: AMM Swap',
    address: '0x041fd22b238fa21cfcf5dd45a8548974d8263b3a531a60388411c5e230f97023',
    link: 'https://app.jediswap.xyz',
    count: 0,
    img: 'jediswap.jpg',
  },
  // {
  //   name: 'Domain name',
  //   address: '0x074e9a8c1fa88a64d00121f8115e58c7d678242f38a1d115a5bc42a0ab866591',
  //   link: 'https://app.starknet.id/',
  //   count: 0,
  //   img: '.jpg',
  // },
  {
    name: '10KSwap: AMM Router',
    address: '0x07a6f98c03379b9513ca84cca1373ff452a7462a3b61598f0af5bb27ad7f76d1',
    link: 'https://10kswap.com',
    count: 0,
    img: '10kswap.jpg',
  },
  {
    name: 'AVNU: Exchange',
    address: '0x04270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f',
    link: 'https://app.avnu.fi/',
    count: 0,
    img: 'avnu.jpg',
  },
  {
    name: 'SithSwap: AMM Router',
    address: '0x028c858a586fa12123a1ccb337a0a3b369281f91ea00544d0c086524b759f627',
    link: 'https://app.sithswap.com/',
    count: 0,
    img: 'sithswap.jpg',
  },
  // {
  //   name: 'StarkEx',
  //   address: '0x07ebd0e95dfc4411045f9424d45a0f132d3e40642c38fdfe0febacf78cc95e76',
  //   link: 'https://app.starkex.org/',
  //   count: 0,
  // },
];
