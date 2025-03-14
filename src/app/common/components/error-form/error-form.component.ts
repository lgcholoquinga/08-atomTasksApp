import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';

@Component({
	selector: 'adm-error-form',
	template: `@if (txtError) {
		<span class="text-red-600">{{ txtError }}</span>
	}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFormComponent {
	public txtError = '';
	private cdr = inject(ChangeDetectorRef);

	@Input() set error(value: string) {
		if (value !== this.txtError) {
			this.txtError = value;
			this.cdr.detectChanges();
		}
	}
}
