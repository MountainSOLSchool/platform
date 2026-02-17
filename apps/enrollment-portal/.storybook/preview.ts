import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import type { Preview } from '@storybook/angular';

const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideRouter([]),
                provideMarkdown(),
            ],
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
