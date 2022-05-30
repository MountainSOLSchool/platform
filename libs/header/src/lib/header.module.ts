import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { UserButtonModule } from '@sol/auth/login';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthUserModule } from '@sol/auth/user';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
    imports: [
        CommonModule,
        UserButtonModule,
        RouterModule,
        ButtonModule,
        ToolbarModule,
        AuthUserModule,
        SidebarModule,
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {}
