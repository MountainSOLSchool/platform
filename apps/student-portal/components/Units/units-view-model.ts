import { Requested } from '@sol/react/request';

export interface UnitsViewModel {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
}
