import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { LoginComponent } from '@sol/auth/login';
import { CardModule } from 'primeng/card';
import { of } from 'rxjs';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { RxLet } from '@rx-angular/template/let';
import { DropdownModule } from 'primeng/dropdown';

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
        RxLet,
        DropdownModule,
    ],
    selector: 'sol-student-selection',
    templateUrl: './select-student.component.html',
    styleUrls: ['./select-student.component.css'],
})
export class SelectStudentComponent {
    students$ = of([
        {
            name: 'Test Student',
            id: 'teststudent',
        },
    ]);

    selectedStudent() {}

    @Output() validityChange = of(true);
}
