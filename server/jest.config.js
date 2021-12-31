module.exports = {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],
  // The test environment that will be used for testing
  testEnvironment: "node",

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
