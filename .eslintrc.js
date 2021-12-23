module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
<<<<<<< HEAD
=======
    tsconfigRootDir: __dirname,
>>>>>>> 6274d7e0a8ef5906982d64ffa1fe1a53af64db9c
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
<<<<<<< HEAD
    'plugin:prettier/recommended',
=======
    // 'plugin:prettier/recommended',
>>>>>>> 6274d7e0a8ef5906982d64ffa1fe1a53af64db9c
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
