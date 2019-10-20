module.exports = {
  "env": {
    "amd": true,
    "browser": true,
    "es6": true,
    "node": true,
    "jest/globals": true
  },
  "plugins": ["jest"],
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "page": true,
    "browser": true,
    "context": true,
    "jestPuppeteer": true,
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
}
