import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import baseConfig from '../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';
import globals from 'globals';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
});

export default [
    ...baseConfig,
    ...nx.configs['flat/react-typescript'],
    ...nextCoreWebVitals,
    ...compat.extends('plugin:prettier/recommended'),
    { languageOptions: { globals: { ...globals.jest } } },
    {
        rules: {
            '@next/next/no-html-link-for-pages': 'off',
            // New in eslint-plugin-react-hooks 7 (via eslint-config-next 16).
            // UnitDetailsPanel's auto-expand effect trips it; rewriting it
            // changes panel behaviour, so warn until that's done deliberately.
            'react-hooks/set-state-in-effect': 'warn',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@next/next/no-html-link-for-pages': [
                'error',
                'apps/student-portal/pages',
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        // Override or add rules here
        rules: {},
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {},
    },
    {
        ignores: ['**/.next/**/*', '**/next-env.d.ts'],
    },
];
