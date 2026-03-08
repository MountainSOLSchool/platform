import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'sol-admin-drawer-nav',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule, MatListModule, MatIconModule, MatDividerModule],
    styles: [
        `
            .nav-section {
                padding: 8px 16px 4px;
                font-size: 12px;
                font-weight: 500;
                color: var(--sol-on-surface-variant, #999);
            }
        `,
    ],
    template: `
        <mat-nav-list>
            <div class="nav-section">Admin</div>
            <a
                mat-list-item
                routerLink="/admin"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
            >
                <mat-icon matListItemIcon>dashboard</mat-icon>
                Dashboard
            </a>
            <a
                mat-list-item
                routerLink="/admin/classes/management"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>school</mat-icon>
                Manage Classes
            </a>
            <a
                mat-list-item
                routerLink="/admin/report"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>description</mat-icon>
                Class Forms & Contacts
            </a>
            <a
                mat-list-item
                routerLink="/admin/students"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>people</mat-icon>
                Student Info Sheets
            </a>
            <a
                mat-list-item
                routerLink="/admin/t-shirts"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>checkroom</mat-icon>
                T-shirt Sizes
            </a>
            <a
                mat-list-item
                routerLink="/admin/enrollments"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>how_to_reg</mat-icon>
                Enrollments
            </a>
            <a
                mat-list-item
                routerLink="/admin/discounts"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>local_offer</mat-icon>
                Discounts
            </a>
            <a
                mat-list-item
                routerLink="/admin/messages"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>mail</mat-icon>
                Enrollment Messages
            </a>
            <a
                mat-list-item
                routerLink="/calendar/classes"
                routerLinkActive="active-link"
            >
                <mat-icon matListItemIcon>calendar_month</mat-icon>
                Class Calendar
            </a>
            <a
                mat-list-item
                href="https://students.mountainsol.org/units"
                target="_blank"
            >
                <mat-icon matListItemIcon>assignment</mat-icon>
                Student Units
            </a>
            @if (isMedicAdmin()) {
                <mat-divider></mat-divider>
                <div class="nav-section">Medic Admin</div>
                <a
                    mat-list-item
                    routerLink="/medic/admin/classes"
                    routerLinkActive="active-link"
                >
                    <mat-icon matListItemIcon>medical_services</mat-icon>
                    Manage Medic Classes
                </a>
                <a
                    mat-list-item
                    routerLink="/medic/admin/enrollments"
                    routerLinkActive="active-link"
                >
                    <mat-icon matListItemIcon>medical_information</mat-icon>
                    Medic Enrollments
                </a>
            }
        </mat-nav-list>
    `,
})
export class AdminDrawerNavComponent {
    readonly isMedicAdmin = input(false);
}
