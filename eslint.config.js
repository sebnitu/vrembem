import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

const formattingRules = {
  rules: {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
  }
};

export default [
  js.configs.recommended,
  formattingRules,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: [
      '**/dev/**/*',
      '**/dist/**/*'
    ]
  },
  {
    name: 'vb/src',
    ignores: [
      '**/tests/**/*',
      '**/*.config.js'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
  },
  {
    name: 'vb/config',
    ignores: [
      '**/src/**/*',
      '**/tests/**/*'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
  },
  {
    name: 'vb/tests',
    ignores: [
      '**/src/**/*',
      '**/*.config.js'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        global: 'readonly',
        vi: 'readonly',
        test: 'readonly',
        it: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly'
      }
    },
  }
];
