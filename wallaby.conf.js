'use strict';

module.exports = function (wallaby) {
  return {
    files: [
      // Application code
      { pattern: 'lib/**/*.ts', load: false }
    ],
    tests: [
      'spec/**/*.ts'
    ],
    env: {
      type: 'node'
    },
    testFramework: 'mocha',
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({ module: 1, target: 2 }) // CommonJS & ES6
    }
  };
};