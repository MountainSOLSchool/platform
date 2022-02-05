import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UserService } from './services/user.service';

@NgModule({
    imports: [CommonModule, AngularFireAuthModule],
    providers: [UserService],
})
export class AuthUserModule {}
