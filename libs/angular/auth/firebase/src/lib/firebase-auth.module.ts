import { NgModule } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';

@NgModule({
    providers: [FirebaseAuthService],
})
export class FirebaseAuthModule {}
