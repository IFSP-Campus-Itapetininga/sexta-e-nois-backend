module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['prettier', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['prettier']
}
