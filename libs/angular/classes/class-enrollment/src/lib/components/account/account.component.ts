import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Output,
} from '@angular/core';
import { LoginComponent } from '@sol/auth/login';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { UserService } from '@sol/auth/user';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, LoginComponent, MatCardModule, MatIconModule],
    selector: 'sol-class-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    user$ = inject(UserService).getUser();

    @Output() validityChange = this.user$.pipe(map((user) => !!user));
}
