import { AbstractControl, ValidationErrors } from '@angular/forms';

const ERROR_DEFAULT: ValidationErrors = {
	required: 'The field is required',
	email: 'Enter a valid email adress',
	fullName: 'Enter a valid fullName',
	fieldsNotMatch: 'holiii',
};

/**
 * Method that permit get error from formControl
 * @param formControl FormControl object
 * @returns Message error if exists or empty
 */
export const getFormControlError = (formControl: AbstractControl): string => {
	if (!formControl.errors) return '';

	const firstErrorKey = Object.keys(formControl.errors!)[0];

	if (formControl.errors[firstErrorKey] === true) {
		return ERROR_DEFAULT[firstErrorKey];
	}

	return formControl.errors![firstErrorKey] || '';
};
