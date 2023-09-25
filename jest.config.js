// jest.config.js
module.exports = {
    // Otras configuraciones de Jest
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      },
  };
  
  