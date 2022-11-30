import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '@sol/auth/login';
import { CardModule } from 'primeng/card';
import { map } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule, LoginComponent, CardModule],
    selector: 'sol-class-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    user$ = inject(AngularFireAuth).user;

    @Output() validityChange = this.user$.pipe(map((user) => !!user));
}
