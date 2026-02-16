import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import type { Preview } from '@storybook/angular';

const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), provideRouter([])],
        }),
    ],
    parameters: {
        layout: 'padded',
        a11y: {
            test: 'warn',
        },
    },
};

export default preview;
