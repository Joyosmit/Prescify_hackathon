const hre = require("hardhat");

async function main() {
  const Prescription = await hre.ethers.getContractFactory("HealthChain");
  const prescription = await Prescription.deploy("bafkreia56x2i5j5faknoxwwk7rrxcojcxzio5tv7trobv65uywnkn42x3y","bafkreia56x2i5j5faknoxwwk7rrxcojcxzio5tv7trobv65uywnkn42x3y");

  await prescription.waitForDeployment();
  console.log("Prescription contract deployed at:", await prescription.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
