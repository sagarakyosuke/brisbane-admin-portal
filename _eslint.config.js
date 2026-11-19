import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  { ignores: ['dist', 'build', 'node_modules'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // Bridge for older airbnb configs
      ...compat.extends('airbnb-typescript', 'plugin:prettier/recommended')
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser
      },
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier
    },
    settings: {
      react: {
        pragma: 'React',
        fragment: 'Fragment',
        version: 'detect'
      }
    },
    rules: {
      // Your exact rules translated
      'prettier/prettier': 'off',
      'react/jsx-filename-extension': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'import/prefer-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'comma-dangle': 'off',
      'max-len': 'off',
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-return-assign': 'off',
      'object-curly-newline': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/no-unescaped-entities': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-max-props-per-line': [1, { maximum: 2, when: 'multiline' }],
      indent: 'off',
      '@typescript-eslint/indent': [0],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['off'],
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/no-shadow': ['off'],
      '@typescript-eslint/dot-notation': ['off'],
      'react/prop-types': ['off'],
      '@typescript-eslint/naming-convention': ['off']
    }
  }
);
