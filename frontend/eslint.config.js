import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    rules: {
      // Disable rules that conflict with prettier
      indent: 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'max-len': 'off',
      'no-multiple-empty-lines': 'off',
      'eol-last': 'off',
      'no-trailing-spaces': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'comma-spacing': 'off',
      'key-spacing': 'off',
      'keyword-spacing': 'off',
      'space-before-blocks': 'off',
      'space-before-function-paren': 'off',
      'space-in-parens': 'off',
      'space-infix-ops': 'off',
      'arrow-spacing': 'off',
      'block-spacing': 'off',
      'brace-style': 'off',
      'comma-style': 'off',
      'func-call-spacing': 'off',
      'function-paren-newline': 'off',
      'implicit-arrow-linebreak': 'off',
      'linebreak-style': 'off',
      'max-statements-per-line': 'off',
      'newline-per-chained-call': 'off',
      'no-whitespace-before-property': 'off',
      'nonblock-statement-body-position': 'off',
      'object-property-newline': 'off',
      'operator-linebreak': 'off',
      'padded-blocks': 'off',
      'padding-line-between-statements': 'off',
      'rest-spread-spacing': 'off',
      'semi-spacing': 'off',
      'semi-style': 'off',
      'space-unary-ops': 'off',
      'switch-colon-spacing': 'off',
      'template-tag-spacing': 'off',
      'wrap-regex': 'off',

      // Disable this rule for shadcn/ui components
      'react-refresh/only-export-components': 'off',
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
