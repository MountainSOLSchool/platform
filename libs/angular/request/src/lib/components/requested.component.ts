import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
    TemplateRef,
} from '@angular/core';
import { Requested, RequestState } from '../models/requested.type';
import {
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
} from '@angular/common';

@Component({
    standalone: true,
    selector: 'sol-requested',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-container [ngSwitch]="requestState">
        <ng-container *ngIf="!!loadingTemplate">
            <ng-container *ngSwitchCase="RequestState.Loading">
                <ng-container
                    *ngTemplateOutlet="loadingTemplate"
                ></ng-container>
            </ng-container>
        </ng-container>
        <ng-container *ngIf="!!errorTemplate">
            <ng-container *ngSwitchCase="RequestState.Error">
                <ng-container *ngTemplateOutlet="errorTemplate"></ng-container>
            </ng-container>
        </ng-container>
        <ng-container *ngSwitchDefault>
            <ng-container *ngIf="!!loadedTemplate">
                <ng-container
                    *ngTemplateOutlet="
                        loadedTemplate;
                        context: { data: asT(requestState) }
                    "
                ></ng-container>
            </ng-container>
        </ng-container>
    </ng-container>`,
    imports: [NgSwitch, NgSwitchCase, NgTemplateOutlet, NgIf, NgSwitchDefault],
})
export class RequestedComponent<T> {
    protected readonly RequestState = RequestState;

    @Input({ required: true }) requestState!: Requested<T>;
    @ContentChild('loading') loadingTemplate?: TemplateRef<unknown>;
    @ContentChild('error') errorTemplate?: TemplateRef<unknown>;
    @ContentChild('loaded') loadedTemplate?: TemplateRef<unknown>;

    asT(data: Requested<T>): T {
        return data as T;
    }
}
