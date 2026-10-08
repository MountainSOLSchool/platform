import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import typescriptEslintParser from '@typescript-eslint/parser';

const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
});

// Angular 22 makes OnPush the default and angular-eslint 22 errors on any
// component that isn't OnPush. The Angular 22 migration pinned the components
// that relied on the old default to ChangeDetectionStrategy.Eager to keep their
// behaviour; moving them to OnPush is its own change, so the rule stays off
// until then. Spread this AFTER nx.configs['flat/angular'] (which enables it).
export const onPushNotYetRequired = [
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
        },
    },
];

export default [
    ...nx.configs['flat/base'],
    { plugins: { 'unused-imports': eslintPluginUnusedImports } },
    ...angular.configs.tsRecommended.map((config) => ({
        ...config,
        files: ['**/*.ts'],
    })),
    { files: ['**/*.ts'], processor: angular.processInlineTemplates },
    ...compat
        .config({ extends: ['plugin:prettier/recommended'] })
        .map((config) => ({
            ...config,
            files: ['**/*.ts'],
            rules: {
                ...config.rules,
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        prefix: 'app',
                        style: 'kebab-case',
                        type: 'element',
                    },
                ],
                '@angular-eslint/directive-selector': [
                    'warn',
                    {
                        prefix: 'app',
                        style: 'camelCase',
                        type: 'attribute',
                    },
                ],
                '@nx/enforce-module-boundaries': [
                    'error',
                    {
                        enforceBuildableLibDependency: true,
                        allow: [],
                        depConstraints: [
                            {
                                sourceTag: '*',
                                onlyDependOnLibsWithTags: ['*'],
                            },
                        ],
                        ignoredCircularDependencies: [
                            ['enrollment-portal', 'angular-admin-discounts'],
                            [
                                'enrollment-portal',
                                'angular-admin-enrollment-messages',
                            ],
                        ],
                    },
                ],
            },
        })),
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        files: ['**/*.tsx'],
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    {
        files: ['**/*.stories.ts', '**/*.stories.tsx'],
        rules: {
            '@nx/enforce-module-boundaries': 'off',
        },
    },
    ...compat
        .config({
            plugins: ['@ngrx'],
        })
        .map((config) => ({
            ...config,
            files: ['**/*.ts'],
            rules: {
                ...config.rules,
                '@ngrx/no-effects-in-providers': 'error',
                '@ngrx/updater-explicit-return-type': 'warn',
                '@ngrx/no-dispatch-in-effects': 'warn',
                '@ngrx/prefer-action-creator-in-of-type': 'warn',
                '@ngrx/prefer-concat-latest-from': 'warn',
                '@ngrx/prefer-effect-callback-in-block-statement': 'warn',
                '@ngrx/use-effects-lifecycle-interface': 'warn',
                '@ngrx/avoid-combining-selectors': 'warn',
                '@ngrx/avoid-dispatching-multiple-actions-sequentially': 'warn',
                '@ngrx/avoid-duplicate-actions-in-reducer': 'warn',
                '@ngrx/avoid-mapping-selectors': 'warn',
                '@ngrx/good-action-hygiene': 'warn',
                '@ngrx/no-multiple-global-stores': 'warn',
                '@ngrx/no-reducer-in-key-names': 'warn',
                '@ngrx/no-store-subscription': 'warn',
                '@ngrx/no-typed-global-store': 'warn',
                '@ngrx/on-function-explicit-return-type': 'warn',
                '@ngrx/prefer-action-creator-in-dispatch': 'warn',
                '@ngrx/prefer-action-creator': 'warn',
                '@ngrx/prefer-inline-action-props': 'warn',
                '@ngrx/prefer-one-generic-in-create-for-feature-selector':
                    'warn',
                '@ngrx/prefer-selector-in-select': 'warn',
                '@ngrx/prefix-selectors-with-select': 'warn',
                '@ngrx/select-style': 'warn',
                '@ngrx/use-consistent-global-store-name': 'warn',
            },
            languageOptions: {
                parserOptions: {
                    project: ['./tsconfig.base.json'],
                },
            },
        })),
    ...compat
        .config({
            extends: ['plugin:@eslint-community/eslint-comments/recommended'],
        })
        .map((config) => ({
            ...config,
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                ...config.rules,
                '@eslint-community/eslint-comments/no-use': [
                    'error',
                    {
                        allow: [],
                    },
                ],
            },
        })),
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
];
