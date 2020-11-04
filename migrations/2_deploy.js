const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
  deployer.deploy(MyToken, "100000000", "Mytoken", "8", "MYTK");
};
