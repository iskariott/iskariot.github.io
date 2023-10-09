const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@utils': resolvePath('./src/utils'),
      '@starkUtils': resolvePath('./src/utils/starknet'),
      '@zkUtils': resolvePath('./src/utils/zksync'),
      '@components': resolvePath('./src/components'),
      '@pages': resolvePath('./src/pages'),
      '@redux': resolvePath('./src/redux'),
    },
  },
};
