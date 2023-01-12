import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FunctionsApi } from '@sol/firebase/functions-api';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    template: `<p-card *ngFor="let enrollment of enrollments$ | async">
        <p><b>Student name:</b> {{ enrollment.studentName }}</p>
        <p><b>Final cost:</b> {{ enrollment.finalCost | currency }}</p>
        <p><b>Classes:</b> {{ enrollment.classIds | json }}</p>
        <p><b>Transaction Id:</b> {{ enrollment.transactionId }}</p>
    </p-card>`,
    imports: [CommonModule, CardModule],
})
export class AccountEnrollmentsComponent {
    readonly enrollments$ = inject(FunctionsApi).call<
        Array<{
            studentName: string;
            contactEmail: string;
            finalCost: number;
            classIds: Array<string>;
            transactionId?: string;
        }>
    >('enrollments');
}
