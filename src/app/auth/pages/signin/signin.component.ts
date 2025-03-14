import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormControlErrorDirective, FormSubmitDirective } from '@common/core/directives';
import { Subject, takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { customEmailValidator, NgxValidators } from '@common/core/validators';
import { AuthService } from '@auth/core/services';
import { Router } from '@angular/router';
import { ToastService } from '@common/core/services';

@Component({
	selector: 'atm-signin',
	imports: [
		ButtonModule,
		InputTextModule,
		FloatLabelModule,
		ConfirmDialogModule,
		ReactiveFormsModule,
		FormSubmitDirective,
		FormControlErrorDirective,
	],
	templateUrl: './signin.component.html',
	providers: [ConfirmationService],
})
export default class SigninComponent implements OnDestroy {
	private fb = inject(FormBuilder);
	private router = inject(Router);
	private authService = inject(AuthService);
	private toastService = inject(ToastService);
	private confirmationService = inject(ConfirmationService);

	private destroy$ = new Subject<void>();

	form = this.fb.nonNullable.group({
		email: ['', [NgxValidators.required('Email Field is required'), customEmailValidator]],
	});

	public onSignIn() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { email } = this.form.getRawValue();
		this.authService
			.signIn(email)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (existUser) => {
					if (existUser) {
						this.onSuccessProcess();
						return;
					}

					this.showConfirmUser();
				},
				error: () => this.onShowErrorMessage(),
			});
	}

	private onCreateUser() {
		const { email } = this.form.getRawValue();
		this.authService
			.create(email)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (ok) => {
					if (ok) {
						this.onSuccessProcess();
					}
				},
				error: () => this.onShowErrorMessage(),
			});
	}

	private onSuccessProcess() {
		this.router.navigateByUrl('/tasks');
		this.toastService.showNotification('info', 'Information', 'Successful login! Welcome back.');
	}

	private showConfirmUser() {
		this.confirmationService.confirm({
			message: 'You are not registered, do you want to register?',
			header: 'Confirmation',
			closable: true,
			closeOnEscape: true,
			rejectButtonProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true,
			},
			acceptButtonProps: {
				label: 'Confirm',
			},
			accept: () => {
				this.onCreateUser();
			},
		});
	}

	onShowErrorMessage() {
		this.toastService.showNotification('error', 'Error', 'A problem occurred contact your administrator');
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}
}
