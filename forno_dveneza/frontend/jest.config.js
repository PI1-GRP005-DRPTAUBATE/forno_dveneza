module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "https://jestjs.io",
  },
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
  },
};
