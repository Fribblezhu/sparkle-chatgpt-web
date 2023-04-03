module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],

  overrides: [
  ],

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json'
  },

  plugins: ['vue', '@typescript-eslint'],

  // 规则：https://cloud.tencent.com/developer/chapter/12618
  rules: {
    'space-before-function-paren': 0,
    'object-curly-spacing': 'off',
    'dot-notation': 'off',
    'arrow-body-style': 'off',
    'comma-dangle': ['error', { arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'ignore'
    }],
    'no-return-assign': 0,
    'no-trailing-spaces': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'vue/max-attributes-per-line': [
      0,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'vue/multi-word-component-names': 0,
    'no-tabs': 0,
    'prefer-promise-reject-errors': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    'no-delete-var': 2,
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false
      }
    ],
    'template-curly-spacing': 'off',
    indent: 'off'
  },

  root: true
}
