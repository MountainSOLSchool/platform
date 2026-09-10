import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    linkedSignal,
    signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ClassListService } from '@sol/angular/classes/list';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { SolToastService } from '@sol/angular/toast';
import type { AudienceSelector } from '@sol/ts/firebase/api-types';
import {
    AudienceKind,
    AudienceOption,
    ContactAudiencesViewComponent,
} from './contact-audiences.view.component';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ContactAudiencesViewComponent],
    template: `<sol-contact-audiences-view
        [kind]="kind()"
        [semesters]="semesters.value() ?? []"
        [semesterId]="semesterId()"
        [classes]="classes.value() ?? []"
        [classId]="classId()"
        [years]="years()"
        [includeAllGuardians]="includeAllGuardians()"
        [contacts]="audience.value()?.contacts"
        [totalBeforeDedupe]="audience.value()?.totalBeforeDedupe ?? 0"
        [studentsWithoutEmail]="audience.value()?.studentsWithoutEmail ?? 0"
        [loading]="audience.isLoading()"
        (kindChange)="kind.set($event)"
        (semesterIdChange)="semesterId.set($event)"
        (classIdChange)="classId.set($event)"
        (yearsChange)="years.set($event)"
        (includeAllGuardiansChange)="includeAllGuardians.set($event)"
        (copyClick)="copy()"
    ></sol-contact-audiences-view>`,
})
export class ContactAudiencesComponent {
    readonly #api = inject(MountainSolApiService);
    readonly #semesterListService = inject(ClassesSemesterListService);
    readonly #classListService = inject(ClassListService);
    readonly #toastService = inject(SolToastService);

    readonly kind = signal<AudienceKind>('semester');
    readonly years = signal(2);
    readonly includeAllGuardians = signal(false);

    readonly semesters = rxResource({
        stream: () =>
            this.#semesterListService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly semesterId = linkedSignal<string>(
        () => this.semesters.value()?.[0]?.id ?? ''
    );

    readonly classes = rxResource({
        params: () => (this.kind() === 'class' ? this.semesterId() : undefined),
        stream: ({ params: semesterId }) =>
            this.#classListService.getClassesBySemesterIds([semesterId]).pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                // Grouped classes are ordinary classes that a group points at,
                // so flatten them in rather than offering groups separately.
                map(
                    ({ [semesterId]: semester }): Array<AudienceOption> =>
                        [
                            ...(semester?.classes ?? []),
                            ...(semester?.groups ?? []).flatMap(
                                ({ classes }) => classes
                            ),
                        ]
                            .map(({ id, title }) => ({ id, name: title }))
                            .sort((a, b) => a.name.localeCompare(b.name))
                )
            ),
    });

    readonly classId = linkedSignal<string>(
        () => this.classes.value()?.[0]?.id ?? ''
    );

    readonly #selector = computed((): AudienceSelector | undefined => {
        switch (this.kind()) {
            case 'allTime':
                return { type: 'allTime' };
            case 'recentYears':
                return { type: 'recentYears', years: this.years() };
            case 'semester': {
                const semesterId = this.semesterId();
                return semesterId
                    ? { type: 'semester', semesterId }
                    : undefined;
            }
            case 'class': {
                const semesterId = this.semesterId();
                const classId = this.classId();
                return semesterId && classId
                    ? { type: 'class', semesterId, classId }
                    : undefined;
            }
        }
    });

    readonly audience = rxResource({
        params: () => {
            const selector = this.#selector();
            return selector
                ? {
                      selector,
                      includeAllGuardians: this.includeAllGuardians(),
                  }
                : undefined;
        },
        stream: ({ params }) => this.#api.contactAudiences(params),
    });

    copy() {
        const contacts = this.audience.value()?.contacts ?? [];
        if (!contacts.length) {
            return;
        }

        navigator.clipboard.writeText(
            contacts
                .map(({ name, email }) => (name ? `${name} <${email}>` : email))
                .join(', ')
        );

        this.#toastService.add({
            severity: 'success',
            detail: `Copied ${contacts.length} addresses — paste into Bcc`,
        });
    }
}
