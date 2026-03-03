import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/eslint-plugin'; // Import TS ESLint plugin
import tsParser from '@typescript-eslint/parser'; // Import TS Parser
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    // 1. Include TypeScript files
    files: ['**/*.{js,jsx,ts,tsx}'], 
    
    // 2. Add TypeScript plugin
    plugins: {
      '@typescript-eslint': ts,
    },
    
    // 3. Extend recommended configs for JS, React Hooks, React Refresh, AND TypeScript
    extends: [
      js.configs.recommended,
      ts.configs.recommended, // Add TypeScript recommended rules
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    
    languageOptions: {
      // 4. Specify TypeScript Parser
      parser: tsParser, 
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        // If you have a tsconfig.json, include it here for better context
        // project: './tsconfig.json', 
      },
    },
    
    rules: {
      // 5. STOPPING WARNINGS: Change error ('2') to off ('0') for unused variables
      'no-unused-vars': 'off', 
      
      // Optional: You might also want to silence TS-specific unused var warnings 
      // if they still appear, though the JS rule being off often handles this.
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Optional: If you want to disable ALL warnings/errors for maximum quietness
      // "@typescript-eslint/no-explicit-any": "off",
      // "react-refresh/only-export-components": "off", 
    },
  },
]);