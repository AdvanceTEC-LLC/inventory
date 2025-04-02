import js from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        browser: true,
        es6: true,
        node: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'error',
      'max-lines-per-function': [
        'error',
        { max: 50, skipBlankLines: true, skipComments: true },
      ],
      'max-lines': [
        'warn',
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  prettier,
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        test: true, // Define Jest globals
        expect: true,
        beforeEach: true,
        afterEach: true,
        describe: true,
      },
    },
    rules: {
      'max-lines-per-function': 'off',
      'max-lines': 'off',
    },
  },
]
