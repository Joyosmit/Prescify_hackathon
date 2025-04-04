require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Loads your environment variables

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // From Ankr
      accounts: [process.env.PRIVATE_KEY], // Your private key (secured in .env)
    },
  },
};
