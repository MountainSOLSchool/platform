import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastSeverity =
    | 'success'
    | 'info'
    | 'warn'
    | 'error'
    | 'secondary'
    | 'contrast';

export interface ToastMessage {
    severity?: ToastSeverity;
    summary?: string;
    detail?: string;
    life?: number;
}

const SEVERITY_CLASS: Record<ToastSeverity, string> = {
    success: 'sol-toast-success',
    info: 'sol-toast-info',
    warn: 'sol-toast-warn',
    error: 'sol-toast-error',
    secondary: 'sol-toast-secondary',
    contrast: 'sol-toast-contrast',
};

@Injectable({ providedIn: 'root' })
export class SolToastService {
    private readonly snack = inject(MatSnackBar);

    add(message: ToastMessage): void {
        const text = [message.summary, message.detail]
            .filter(Boolean)
            .join(': ');
        const config: MatSnackBarConfig = {
            duration: message.life ?? 5000,
            panelClass: message.severity
                ? ['sol-toast', SEVERITY_CLASS[message.severity]]
                : ['sol-toast'],
        };
        this.snack.open(text, 'Dismiss', config);
    }
}
