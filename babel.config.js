module.exports = {
  presets: [['babel-preset-expo', { targets: { node: 'current' } }]],
  plugins: [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": true,
      "allowUndefined": true
    }]
  ]
}
