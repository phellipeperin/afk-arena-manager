module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    // 'plugin:prettier/recommended',
  ],
  plugins: [],
  rules: {},
  overrides: [
    {
      files: ['*.js', '*.ts', '*.vue'],
      rules: {
        semi: [1, 'always'],
        'comma-dangle': [1, 'always-multiline'],
        'vue/max-attributes-per-line': ['error', {
          singleline: {
            max: 1,
            allowFirstLine: true,
          },
          multiline: {
            max: 1,
            allowFirstLine: false,
          },
        }],
      },
    },
  ],
};
