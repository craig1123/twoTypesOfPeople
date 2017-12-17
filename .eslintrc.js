module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
      "es6": true,
      "browser": true,
      "node": true,
      "mocha": true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
  },
  rules: {
    'eol-last': 'off',
    "no-console": 0,
    "max-len": 1,
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'off',
    'import/extensions': 0,
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'global-require': 'off',
    'react/require-default-props': 'off',
    "react/prop-types": 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-filename-extension': [0],
    'no-use-before-define': ["error", { "functions": false, "classes": false, "variables": false }],
    "react/forbid-prop-types": [0],
    "react/prefer-stateless-function": [1, { "ignorePureComponents": true }]
  },
};
