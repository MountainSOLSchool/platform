import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { DiscountFormComponent } from './discount-form.component';
import {
    mockDiscountAmount,
    mockDiscountPercent,
    mockDiscountAmountBeforeDate,
    mockDiscountClassesPercent,
    mockDiscountFreeClasses,
    mockDiscountBuyX,
} from '../../../../../../../apps/enrollment-portal/.storybook/fixtures';
import { createMockApiService } from '../../../../../../../apps/enrollment-portal/.storybook/mocks/api-service.mock';

const mockRouter = { navigate: () => Promise.resolve(true) };

function createRouteWithParam(id: string) {
    return {
        paramMap: of({ get: (key: string) => (key === 'id' ? id : null) }),
    };
}

function createRouteNoParam() {
    return {
        paramMap: of({ get: () => null }),
    };
}

const meta: Meta<DiscountFormComponent> = {
    title: 'Admin/Discounts/DiscountForm',
    component: DiscountFormComponent,
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService(),
                },
                { provide: Router, useValue: mockRouter },
                {
                    provide: ActivatedRoute,
                    useValue: createRouteNoParam(),
                },
            ],
        }),
    ],
};

export default meta;
type Story = StoryObj<DiscountFormComponent>;

export const CreateNew: Story = {};

export const EditAmount: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getDiscount: (() =>
                            of({
                                discount: mockDiscountAmount,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getDiscount'],
                    }),
                },
                {
                    provide: ActivatedRoute,
                    useValue: createRouteWithParam(mockDiscountAmount.id),
                },
            ],
        }),
    ],
};

export const EditPercent: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getDiscount: (() =>
                            of({
                                discount: mockDiscountPercent,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getDiscount'],
                    }),
                },
                {
                    provide: ActivatedRoute,
                    useValue: createRouteWithParam(mockDiscountPercent.id),
                },
            ],
        }),
    ],
};

export const EditAmountBeforeDate: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getDiscount: (() =>
                            of({
                                discount: mockDiscountAmountBeforeDate,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getDiscount'],
                    }),
                },
                {
                    provide: ActivatedRoute,
                    useValue: createRouteWithParam(
                        mockDiscountAmountBeforeDate.id
                    ),
                },
            ],
        }),
    ],
};

export const EditClassesPercent: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getDiscount: (() =>
                            of({
                                discount: mockDiscountClassesPercent,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getDiscount'],
                    }),
                },
                {
                    provide: ActivatedRoute,
                    useValue: createRouteWithParam(
                        mockDiscountClassesPercent.id
                    ),
                },
            ],
        }),
    ],
};

export const EditFreeClasses: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getDiscount: (() =>
                            of({
                                discount: mockDiscountFreeClasses,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getDiscount'],
                    }),
                },
                {
                    provide: ActivatedRoute,
                    useValue: createRouteWithParam(mockDiscountFreeClasses.id),
                },
            ],
        }),
    ],
};

export const EditBuyXClassTypePercent: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: MountainSolApiService,
                    useValue: createMockApiService({
                        getDiscount: (() =>
                            of({
                                discount: mockDiscountBuyX,
                            })) as ReturnType<
                            typeof createMockApiService
                        >['getDiscount'],
                    }),
                },
                {
                    provide: ActivatedRoute,
                    useValue: createRouteWithParam(mockDiscountBuyX.id),
                },
            ],
        }),
    ],
};
