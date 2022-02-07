module.exports = {
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'func-names': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
