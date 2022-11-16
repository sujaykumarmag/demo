require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "1tNAqW8fykOUEC4zb4BLZe_P44aBP4LC";

const GOERLI_PRIVATE_KEY = "41531c07de223f08326ab752ebd834ec0dbc9247b72f437446f4f33f103e124b";

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [ GOERLI_PRIVATE_KEY ]
    }
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
