import { ComponentRef, Directive, ElementRef, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Subject, EMPTY, fromEvent, merge, takeUntil } from 'rxjs';
import { FormSubmitDirective } from './form-submit.directive';
import { getFormControlError } from '../validators';
import { ErrorFormComponent } from '@common/components';

@Directive({
	selector: '[formControl], [formControlName]',
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
	private readonly _destroy$ = new Subject<void>();
	private readonly _ngControl = inject(NgControl);

	public elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
	private readonly _form = inject(FormSubmitDirective, { optional: true });
	private readonly _form$ = this._form ? this._form.submit$ : EMPTY;
	private readonly _blurEvent = fromEvent(this.elementRef.nativeElement, 'blur');

	private readonly _vcr = inject(ViewContainerRef);
	private _componentRef!: ComponentRef<ErrorFormComponent>;

	ngOnInit(): void {
		merge(this._form$, this._blurEvent, this._ngControl.statusChanges!)
			.pipe(takeUntil(this._destroy$))
			.subscribe(() => {
				const control = this._ngControl.control!;
				this.setCustomUI();

				if (control.dirty || control.touched) {
					const errorControl = getFormControlError(control);
					this.setError(errorControl);

					if (this.isFloatLabel()) {
						this.addIntoFloatLabel();
					}
				}
			});
	}

	private addIntoFloatLabel() {
		const parentElement = this.elementRef.nativeElement.parentElement;
		parentElement?.appendChild(this._componentRef.location.nativeElement);
	}

	private isFloatLabel() {
		const parentElement = this.elementRef.nativeElement.parentElement;
		if (!parentElement) return false;

		return parentElement.classList.contains('p-floatlabel');
	}

	private setCustomUI() {
		const control = this._ngControl.control!;
		const element = this.elementRef.nativeElement;

		if (!element) return;

		if (control.invalid && control.dirty) {
			element.classList.add('ng-invalid', 'ng-dirty');
			element.nextElementSibling?.classList.add('ng-invalid', 'ng-dirty');
		} else if (control.invalid && control.touched) {
			element.classList.add('ng-invalid', 'ng-touched');
			element.nextElementSibling?.classList.add('ng-invalid', 'ng-dirty');
		} else if (control.valid) {
			element!.classList.remove('ng-invalid', 'ng-dirty', 'ng-touched');
			element.nextElementSibling?.classList.remove('ng-invalid', 'ng-dirty');
		}
	}

	private setError(value: string) {
		if (!this._componentRef) {
			this._componentRef = this._vcr.createComponent(ErrorFormComponent);
		}

		this._componentRef.instance.error = value;
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
