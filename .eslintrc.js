/*global module*/
module.exports = {
  'ecmaFeatures': {
    'modules': true
  },
  'rules': {
    'indent': [
      1,
      2
    ],
    'quotes': [
      1,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'semi': [
      1,
      'never'
    ],
    'no-console': 0
  },
  'env': {
    'es6': true,
    'browser': true,
    'jquery': true
  },
  'globals': {
    'AWS': true,
    'apigClientFactory': true
  },
  'extends': 'eslint:recommended',
  'plugins': [
    'html'
  ]
}
