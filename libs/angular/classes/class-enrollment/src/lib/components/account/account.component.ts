import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Output,
} from '@angular/core';
import { LoginComponent } from '@sol/auth/login';
import { CardModule } from 'primeng/card';
import { map } from 'rxjs';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { UserService } from '@sol/auth/user';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        LoginComponent,
        CardModule,
        MessagesModule,
        MessageModule,
        ToastModule,
    ],
    selector: 'sol-class-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {
    user$ = inject(UserService).getUser();

    @Output() validityChange = this.user$.pipe(map((user) => !!user));
}
