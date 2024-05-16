const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });
const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});
console.log(jestConfig);
console.log("jestConfig");

module.exports = jestConfig;
