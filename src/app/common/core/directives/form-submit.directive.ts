import { Directive, ElementRef, inject } from '@angular/core';
import { fromEvent, shareReplay } from 'rxjs';

@Directive({
	selector: 'form',
})
export class FormSubmitDirective {
	private readonly _host: ElementRef<HTMLFormElement> = inject(ElementRef);

	public submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

	get element() {
		return this._host.nativeElement;
	}
}
