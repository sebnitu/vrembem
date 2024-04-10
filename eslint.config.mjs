import globals from 'globals';
import js from '@eslint/js';

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
