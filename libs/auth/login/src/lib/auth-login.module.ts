import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login.component';
import { FirebaseAuthModule } from '@sol/firebase/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/login.effects';
import { AuthLoginRoutingModule } from './auth-login-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        AuthLoginRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        FirebaseAuthModule,
        EffectsModule.forFeature([LoginEffects]),
    ],
    declarations: [LoginComponent],
})
export class AuthLoginModule {}
