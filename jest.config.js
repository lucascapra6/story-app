module.exports = {
  preset: 'react-native',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', './src/test'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  setupFiles: ['<rootDir>/src/test/jestSetup.ts'],
};
