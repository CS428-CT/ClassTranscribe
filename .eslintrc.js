module.exports = {
  root: true,
  extends: ['@react-native-community'],
  env: {
    jest: true,
  },
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
}
