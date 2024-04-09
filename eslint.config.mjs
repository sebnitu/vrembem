import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    ignores: [
      '**/dev/**/*',
      '**/dist/**/*',
      '**/tests/**/*',
      '**/vite.config.js'
    ],
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
      ...js.configs.recommended.rules
    }
  }
];
