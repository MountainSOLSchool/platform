import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { EnrollmentMessagesEditorComponent } from './enrollment-messages-editor.component';
import {
    mockMessages,
    mockMessagesEmpty,
} from '../../../../../../../apps/enrollment-portal/.storybook/fixtures';
import { createMockApiService } from '../../../../../../../apps/enrollment-portal/.storybook/mocks/api-service.mock';

const meta: Meta<EnrollmentMessagesEditorComponent> = {
    title: 'Admin/EnrollmentMessages/Editor',
    component: EnrollmentMessagesEditorComponent,
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getEnrollmentMessagesAdmin: (() =>
                            of({
                                messages: mockMessages,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getEnrollmentMessagesAdmin'],
                    }),
                },
            ],
        }),
    ],
};

export default meta;
type Story = StoryObj<EnrollmentMessagesEditorComponent>;

export const WithMessages: Story = {};

export const Empty: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getEnrollmentMessagesAdmin: (() =>
                            of({
                                messages: mockMessagesEmpty,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getEnrollmentMessagesAdmin'],
                    }),
                },
            ],
        }),
    ],
};
