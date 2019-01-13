var Recipe = artifacts.require("./RecipeList.sol");
module.exports = function(deployer) {
  deployer.deploy(Recipe);
}