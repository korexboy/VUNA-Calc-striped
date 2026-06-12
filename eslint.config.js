const js = require('@eslint/js');

module.exports = [
  {
    ignores: [
      'dist/',
      'coverage/',
      'node_modules/',
      'assets/js/bootstrap.min.js',
      'assets/css/'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        evaluateExpression: 'readonly',
        areaOfSquare: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        prompt: 'readonly',   // <-- ADD THIS
        alert: 'readonly'     // <-- ADD THIS (just in case)
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
      'semi': ['error', 'always']
    }
  },
  {
    files: ['assets/js/script.js'],
    rules: {
      // These functions are called via HTML onclick attributes,
      // so ESLint can't detect their usage. Disable the rule here.
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        console: 'readonly'
      }
    }
  }
];