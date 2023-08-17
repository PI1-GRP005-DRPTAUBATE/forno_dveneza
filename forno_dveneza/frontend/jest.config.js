module.exports = {
  testEnvironmentOptions: {
    url: "https://jestjs.io",
  },
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};
