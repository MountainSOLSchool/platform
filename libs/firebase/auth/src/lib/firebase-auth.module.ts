import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
    imports: [CommonModule, AngularFireAuthModule],
    providers: [AuthService],
})
export class FirebaseAuthModule {}
