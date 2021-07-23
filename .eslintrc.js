module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
    'guard-for-in': 'off',
    'object-curly-newline': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
    'no-bitwise': 'off',
    'no-return-assign': 'off',
    'max-len': ['error', { code: 120 }],
  },
}
