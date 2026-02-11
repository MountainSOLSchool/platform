import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'sol-admin-menu',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
    ],
    styles: [`
        :host { display: contents; }
        .menu-section { padding: 0 16px; font-size: 12px; font-weight: 500; color: var(--sol-on-surface-variant, #999); margin: 8px 0 4px; }
    `],
    template: `
        <button mat-icon-button [matMenuTriggerFor]="adminMenu" aria-label="Admin menu" style="color: #fff;">
            <mat-icon>menu</mat-icon>
        </button>

        <mat-menu #adminMenu="matMenu">
            <a mat-menu-item routerLink="/classes/enrollment">Class Registration</a>
            <mat-divider></mat-divider>
            <div class="menu-section">Admin</div>
            <a mat-menu-item routerLink="/admin">Dashboard</a>
            <a mat-menu-item routerLink="/admin/classes/management">Manage Classes</a>
            <a mat-menu-item routerLink="/admin/report">Class Forms and Contacts</a>
            <a mat-menu-item routerLink="/admin/students">Student Info Sheets</a>
            <a mat-menu-item routerLink="/admin/t-shirts">T-shirt Sizes</a>
            <a mat-menu-item routerLink="/admin/enrollments">Enrollments</a>
            <a mat-menu-item routerLink="/calendar/classes">Class Calendar</a>
            <a mat-menu-item href="https://students.mountainsol.org/units" target="_blank">Student Units</a>
            @if (isMedicAdmin()) {
                <mat-divider></mat-divider>
                <div class="menu-section">Medic Admin</div>
                <a mat-menu-item routerLink="/medic/admin/classes">Manage Medic Classes</a>
                <a mat-menu-item routerLink="/medic/admin/enrollments">Medic Enrollments</a>
            }
        </mat-menu>`,
})
export class AdminMenuComponent {
    private readonly userService = inject(UserService);

    readonly menuTrigger = viewChild(MatMenuTrigger);

    readonly isMedicAdmin = toSignal(this.userService.isMedicAdmin(), { initialValue: false });
}
