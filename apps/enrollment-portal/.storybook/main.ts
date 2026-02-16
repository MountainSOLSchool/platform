import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
    stories: [
        '../src/**/*.stories.ts',
        '../../../libs/angular/admin/*/src/**/*.stories.ts',
    ],
    addons: ['@storybook/addon-a11y'],
    framework: {
        name: '@storybook/angular',
        options: {},
    },
    staticDirs: [
        '../src/assets',
        {
            from: '../../../libs/angular/header/src/lib/assets',
            to: '/assets/header',
        },
    ],
};

export default config;
