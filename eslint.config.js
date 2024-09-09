import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Flat config for ESLint
export default [
  {
    ignores: ['dist'],  // Ignore dist folder
  },
  js.configs.recommended,  // JavaScript recommended rules
  {
    files: ['**/*.{ts,tsx}'],  // Apply to TypeScript files
    languageOptions: {
      ecmaVersion: 'latest',  // ECMAScript latest version
      sourceType: 'module',  // Use ES modules
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': {}, // Add Prettier plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'error', // Enable Prettier errors
      'max-len': ['error', { code: 60, tabWidth: 2, ignoreComments: true }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
