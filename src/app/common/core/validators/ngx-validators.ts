import { ValidatorFn, Validators } from '@angular/forms';
import { VALIDATOR_MESSAGE_DEFAULT } from '.';

export class NgxValidators {
	static required(message?: string): ValidatorFn {
		return (control) => {
			const error = Validators.required(control);
			return error ? { required: this.getMessage('required', message) } : null;
		};
	}

	static email(message?: string): ValidatorFn {
		return (control) => {
			const error = Validators.email(control);
			return error ? { email: this.getMessage('email', message) } : null;
		};
	}

	static minLength(minLength: number, message?: string): ValidatorFn {
		return (control) => {
			const minLengthFunction = Validators.minLength(minLength);
			const error = minLengthFunction(control);
			return error ? { minLength: this.getMessage('minLength', message, [{ minLength }]) } : null;
		};
	}

	private static getMessage(
		control: keyof typeof VALIDATOR_MESSAGE_DEFAULT,
		message?: string,
		paramsMessage?: Record<string, unknown>[],
	) {
		if (message) return message;

		let messageControl = VALIDATOR_MESSAGE_DEFAULT[control];
		const existParams = paramsMessage && paramsMessage.length > 0;

		if (existParams) {
			paramsMessage.forEach((params) => {
				Object.keys(params)
					.filter((key) => params[key])
					.forEach((key) => {
						messageControl = messageControl.replace(`\${${key}}`, params[key]!.toString());
					});
			});
		}

		return messageControl;
	}
}
