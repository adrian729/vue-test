/* eslint-env node */
module.exports = {
    root: true,
    rules: {
        indent: ['error', 4],
        'vue/require-default-prop': 'off',
    },
    parserOptions: {
        ecmaVersion: 'latest',
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
};
