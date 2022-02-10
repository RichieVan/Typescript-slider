module.exports = {
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  overrides: {
    files: ['*.ts'],
    extends: [
      'airbnb-typescript/base',
      'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
      project: ['./tsconfig.json'],
    }
  },
  rules: {
    'func-names': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
