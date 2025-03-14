import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormControlErrorDirective, FormSubmitDirective } from '@common/core/directives';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

import { customEmailValidator, NgxValidators } from '@common/core/validators';

@Component({
	selector: 'atm-signin',
	imports: [
		ButtonModule,
		InputTextModule,
		FloatLabelModule,
		ReactiveFormsModule,
		FormSubmitDirective,
		FormControlErrorDirective,
	],
	templateUrl: './signin.component.html',
})
export default class SigninComponent {
	private fb = inject(FormBuilder);

	form = this.fb.nonNullable.group({
		email: ['', [NgxValidators.required('Email Field is required'), customEmailValidator]],
	});

	onSignIn() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { email } = this.form.getRawValue();
		console.log(email);
	}
}
