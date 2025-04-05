const hre = require("hardhat");

async function main() {
  const Prescription = await hre.ethers.getContractFactory("HealthChain");
  const prescription = await Prescription.deploy("bafkreifb4wek3evhsd5vnwb6hzqzkxtdyjxa35dqdwkkoqcqlohebj7vsy","bafkreifb4wek3evhsd5vnwb6hzqzkxtdyjxa35dqdwkkoqcqlohebj7vsy");

  await prescription.waitForDeployment();
  console.log("Prescription contract deployed at:", await prescription.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
