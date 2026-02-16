import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

const meta: Meta<ConfirmDeleteDialogComponent> = {
    title: 'Admin/Discounts/ConfirmDeleteDialog',
    component: ConfirmDeleteDialogComponent,
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: DIALOG_DATA,
                    useValue: { code: 'EARLYBIRD23' },
                },
                {
                    provide: DialogRef,
                    useValue: { close: () => {} },
                },
            ],
        }),
    ],
};

export default meta;
type Story = StoryObj<ConfirmDeleteDialogComponent>;

export const Default: Story = {};
