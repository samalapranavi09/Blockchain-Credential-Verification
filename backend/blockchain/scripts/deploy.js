import { network } from "hardhat";

const { ethers } = await network.connect();

async function main() {
  const CredentialRegistry =
    await ethers.getContractFactory("CredentialRegistry");

  const credentialRegistry =
    await CredentialRegistry.deploy({
      gasLimit:1000000
    });

  await credentialRegistry.waitForDeployment();

  const address =
    await credentialRegistry.getAddress();

  console.log("CredentialRegistry deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
