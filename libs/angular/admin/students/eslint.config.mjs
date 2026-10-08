import baseConfig, {
    onPushNotYetRequired,
} from '../../../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';

export default [
    ...baseConfig,
    ...nx.configs['flat/angular'],
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
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
        },
    },
    ...onPushNotYetRequired,
    ...nx.configs['flat/angular-template'],
];
