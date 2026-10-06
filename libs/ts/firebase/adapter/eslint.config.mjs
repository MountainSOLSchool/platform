import baseConfig from '../../../../eslint.config.mjs';
import jsoncEslintParser from 'jsonc-eslint-parser';

export default [
    ...baseConfig,
    {
        files: ['firebase-service-factory.utility.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        files: ['firebase-service-method.type.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {},
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
        files: ['**/*.json'],
        rules: {
            '@nx/dependency-checks': 'error',
        },
        languageOptions: {
            parser: jsoncEslintParser,
        },
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off',
        },
    },
];
