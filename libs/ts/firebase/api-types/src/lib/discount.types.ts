export type DiscountType =
    | 'amount'
    | 'percent'
    | 'amount-before-date'
    | 'classes-percent'
    | 'free-classes'
    | 'buy-x-class-type-percent';

export interface DiscountAdmin {
    id: string;
    code: string;
    type: DiscountType;
    active: boolean;
    amount?: number;
    percent?: number;
    date?: string;
    classOrGroupIds?: string[];
    classTypes?: string[];
    minimum?: number;
}

export interface GetDiscountsResponse {
    discounts: DiscountAdmin[];
}

export interface CreateDiscountRequest {
    code: string;
    type: DiscountType;
    active: boolean;
    amount?: number;
    percent?: number;
    date?: string;
    classOrGroupIds?: string[];
    classTypes?: string[];
    minimum?: number;
}

export interface CreateDiscountResponse {
    success: boolean;
    discountId: string;
}

export interface UpdateDiscountRequest {
    id: string;
    code: string;
    type: DiscountType;
    active: boolean;
    amount?: number;
    percent?: number;
    date?: string;
    classOrGroupIds?: string[];
    classTypes?: string[];
    minimum?: number;
}

export interface UpdateDiscountResponse {
    success: boolean;
}

export interface DeleteDiscountRequest {
    id: string;
}

export interface DeleteDiscountResponse {
    success: boolean;
}

export interface GetDiscountRequest {
    id: string;
}

export interface GetDiscountResponse {
    discount: DiscountAdmin | null;
}
