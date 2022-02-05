import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserButtonComponent } from './components/user-button.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        AvatarModule,
        RouterModule,
        MenuModule,
    ],
    declarations: [UserButtonComponent],
    exports: [UserButtonComponent],
})
export class UserButtonModule {}
