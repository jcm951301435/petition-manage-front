module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    "vue/max-attributes-per-line": [2, {
      "singleline": 5,
      "multiline": {
        "max": 5,
        "allowFirstLine": true
      }
    }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
