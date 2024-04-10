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
    files: [
      '**/src/**/*'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
  },
  {
    name: 'vb/tests',
    files: [
      '**/tests/**/*'
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
  },
  {
    name: 'vb/config',
    files: [
      '**/*.config.js'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
  }
];
