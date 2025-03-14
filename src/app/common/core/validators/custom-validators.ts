import { AbstractControl, ValidationErrors } from '@angular/forms';
import { emailPattern, namePattern } from './custom-patterns';

/**
 * Method that allows to validate if the entry is a valid email
 * @param control Control input
 * @returns ValidationErrors or null
 */
export const customEmailValidator = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value;
	if (value === '') return null;

	if (!emailPattern.test(value)) {
		return { email: true };
	}

	return null;
};

export const customFullNameValidator = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value;
	if (value === '') return null;

	if (!namePattern.test(value)) {
		return { fullName: true };
	}

	return null;
};

export const isFieldOneEqualsFieldTwo = (fieldOne: string, fieldTwo: string) => {
	return (control: AbstractControl): ValidationErrors | null => {
		const fieldOneValue = control.get(fieldOne)?.value;
		const fieldTwoValue = control.get(fieldTwo)?.value;

		if (fieldOneValue === '' || fieldTwoValue === '') return null;

		if (fieldOneValue !== fieldTwoValue) {
			return { fieldsNotMatch: true };
		}

		return null;
	};
};
