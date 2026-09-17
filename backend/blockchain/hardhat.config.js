import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

export default {
  plugins: [hardhatEthers],

  solidity: "0.8.20",

  networks: {
    amoy: {
      type: "http",
      url: "https://polygon-amoy-public.nodies.app",
      chainId: 80002,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
