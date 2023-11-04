import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from './services/firebase-auth.service';

@NgModule({
    imports: [CommonModule],
    providers: [FirebaseAuthService],
})
export class FirebaseAuthModule {}
