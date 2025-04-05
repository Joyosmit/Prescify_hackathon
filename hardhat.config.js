require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Loads your environment variables

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `${process.env.INFURA_URL}`, // Replace with your Infura URL
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Replace with your private key (DO NOT expose in code)
    },
  },
};
