import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Output,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '@sol/auth/login';
import { CardModule } from 'primeng/card';
import { map } from 'rxjs';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        LoginComponent,
        CardModule,
        MessagesModule,
        MessageModule,
        ToastModule,
    ],
    selector: 'sol-class-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    user$ = inject(AngularFireAuth).user;

    @Output() validityChange = this.user$.pipe(map((user) => !!user));
}
