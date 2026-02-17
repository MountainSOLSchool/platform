import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { DiscountListComponent } from './discount-list.component';
import {
    mockDiscounts,
    mockDiscountsEmpty,
} from '../../../../../../../apps/enrollment-portal/.storybook/fixtures';
import { createMockApiService } from '../../../../../../../apps/enrollment-portal/.storybook/mocks/api-service.mock';

const meta: Meta<DiscountListComponent> = {
    title: 'Admin/Discounts/DiscountList',
    component: DiscountListComponent,
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService(),
                },
                {
                    provide: Router,
                    useValue: { navigate: () => Promise.resolve(true) },
                },
                {
                    provide: Dialog,
                    useValue: { open: () => ({ closed: of(false) }) },
                },
            ],
        }),
    ],
};

export default meta;
type Story = StoryObj<DiscountListComponent>;

export const WithData: Story = {};

export const Empty: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getDiscounts: (() =>
                            of({
                                discounts: mockDiscountsEmpty,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getDiscounts'],
                    }),
                },
            ],
        }),
    ],
};
