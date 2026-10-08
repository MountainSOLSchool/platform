import baseConfig, { onPushNotYetRequired } from '../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';

export default [
    ...baseConfig,
    ...nx.configs['flat/angular'],
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'warn',
                {
                    type: 'attribute',
                    prefix: 'sol',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'sol',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/prefer-standalone': 'off',
        },
    },
    ...onPushNotYetRequired,
    ...nx.configs['flat/angular-template'],
    {
        files: ['**/.storybook/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: [
                    'apps/enrollment-portal/.storybook/tsconfig.storybook.json',
                ],
            },
        },
    },
];
