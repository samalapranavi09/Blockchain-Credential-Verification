const { ethers } = require("ethers");

// =====================================================
// POLYGON AMOY CONFIGURATION
// =====================================================

const RPC_URL =
  "https://polygon-amoy-bor-rpc.publicnode.com";

const CONTRACT_ADDRESS =
  "0xD2974C62B715f3871F9C7dDED1d1fE8A43F11DD8";

// =====================================================
// SMART CONTRACT ABI
// =====================================================

const CONTRACT_ABI = [
  "function storeCredential(string credentialId, string certificateHash) public",
  "function verifyCredential(string credentialId) public view returns (bool exists, string certificateHash, uint256 timestamp)"
];

// =====================================================
// PROVIDER
// =====================================================

const provider = new ethers.JsonRpcProvider(RPC_URL);

// =====================================================
// BACKEND WALLET
// =====================================================

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

// =====================================================
// SMART CONTRACT
// =====================================================

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  wallet
);

// =====================================================
// STORE CREDENTIAL ON BLOCKCHAIN
// =====================================================

const storeCredentialOnBlockchain = async (
  credentialId,
  certificateHash
) => {
  console.log("\n======================================");
  console.log("BLOCKCHAIN STORAGE");
  console.log("======================================");

  console.log("Wallet:", wallet.address);
  console.log("Credential:", credentialId);
  console.log("Certificate Hash:", certificateHash);

  // ---------------------------------------------------
  // Check wallet balance
  // ---------------------------------------------------

  const balance = await provider.getBalance(
    wallet.address
  );

  console.log(
    "Balance:",
    ethers.formatEther(balance),
    "POL"
  );

  // ---------------------------------------------------
  // Estimate gas required by smart contract
  // ---------------------------------------------------

  const estimatedGas =
    await contract.storeCredential.estimateGas(
      credentialId,
      certificateHash
    );

  console.log(
    "Estimated gas:",
    estimatedGas.toString()
  );

  // ---------------------------------------------------
  // Add 20% safety buffer
  // ---------------------------------------------------

  const gasLimit =
    (estimatedGas * 120n) / 100n;

  console.log(
    "Gas limit:",
    gasLimit.toString()
  );

  // ---------------------------------------------------
  // Use controlled gas price
  // ---------------------------------------------------
  //
  // The Polygon Amoy RPC was reporting ~454 Gwei,
  // which caused an unrealistic transaction cost.
  //
  // We use 30 Gwei for this test transaction.
  // ---------------------------------------------------

  const gasPrice =
    ethers.parseUnits("30", "gwei");

  console.log(
    "Gas price:",
    ethers.formatUnits(
      gasPrice,
      "gwei"
    ),
    "Gwei"
  );

  // ---------------------------------------------------
  // Calculate maximum estimated transaction cost
  // ---------------------------------------------------

  const estimatedCost =
    gasLimit * gasPrice;

  console.log(
    "Estimated transaction cost:",
    ethers.formatEther(
      estimatedCost
    ),
    "POL"
  );

  // ---------------------------------------------------
  // Check whether wallet has enough POL
  // ---------------------------------------------------

  if (balance < estimatedCost) {
    throw new Error(
      `Insufficient POL. ` +
      `Balance=${ethers.formatEther(balance)} POL, ` +
      `Required=${ethers.formatEther(estimatedCost)} POL`
    );
  }

  // ---------------------------------------------------
  // Send transaction
  // ---------------------------------------------------

  console.log(
    "Sending transaction to Polygon Amoy..."
  );

  const tx =
    await contract.storeCredential(
      credentialId,
      certificateHash,
      {
        gasLimit: gasLimit,
        gasPrice: gasPrice
      }
    );

  // ---------------------------------------------------
  // Transaction submitted
  // ---------------------------------------------------

  console.log(
    "Transaction submitted successfully!"
  );

  console.log(
    "Transaction Hash:",
    tx.hash
  );

  // ---------------------------------------------------
  // Wait for blockchain confirmation
  // ---------------------------------------------------

  console.log(
    "Waiting for blockchain confirmation..."
  );

  const receipt = await tx.wait();

  // ---------------------------------------------------
  // Transaction confirmed
  // ---------------------------------------------------

  console.log(
    "Transaction confirmed successfully!"
  );

  console.log(
    "Block Number:",
    receipt.blockNumber
  );

  console.log(
    "Transaction Hash:",
    receipt.hash
  );

  console.log("======================================\n");

  return {
    transactionHash: receipt.hash
  };
};

// =====================================================
// VERIFY CREDENTIAL ON BLOCKCHAIN
// =====================================================

const verifyCredentialOnBlockchain = async (
  credentialId
) => {
  try {
    const result =
      await contract.verifyCredential(
        credentialId
      );

    return {
      exists: result[0],
      certificateHash: result[1],
      timestamp: result[2].toString()
    };

  } catch (error) {
    console.error(
      "Blockchain verification failed:",
      error.message
    );

    throw error;
  }
};

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

module.exports = {
  storeCredentialOnBlockchain,
  verifyCredentialOnBlockchain
};