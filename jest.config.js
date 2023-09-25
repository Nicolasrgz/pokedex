module.exports = {
  // Otras configuraciones de Jest
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
