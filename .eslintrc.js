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
    "guard-for-in": "off",
    "object-curly-newline": "off",
    "no-restricted-syntax": "off"
  },
}
