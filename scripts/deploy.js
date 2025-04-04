const hre = require("hardhat");

async function main() {
  const Prescription = await hre.ethers.getContractFactory("Prescription");
  const prescription = await Prescription.deploy();

  await prescription.waitForDeployment();
  console.log("Prescription contract deployed at:", await prescription.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
