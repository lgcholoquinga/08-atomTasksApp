import { Component, inject } from '@angular/core';
import { SpinnerService } from '@common/core/services';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
	selector: 'luc-spinner',
	imports: [ProgressSpinnerModule],
	template: ` @if (isLoading()) {
		<div class="spinner-overlay">
			<div class="spinner-container">
				<p-progress-spinner ariaLabel="loading" />
				<span class="loading-text">Loading<span class="dots">...</span></span>
			</div>
		</div>
	}`,
	styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
	private readonly spinnerService = inject(SpinnerService);
	isLoading = this.spinnerService.isLoading;
}
