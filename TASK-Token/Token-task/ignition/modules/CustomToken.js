
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CustomTokenModule", (m) => {
  // Pass deployer's address as initial owner
  const deployer = m.getAccount(0); 
  const token = m.contract("MyToken", [deployer]);

  return { token };
});
