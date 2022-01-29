import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { UserButtonModule } from '@sol/auth/login';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, UserButtonModule, RouterModule, ButtonModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {}
