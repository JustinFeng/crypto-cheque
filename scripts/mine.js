async function main() {
  await hre.network.provider.send("hardhat_mine", ["0x10"]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });