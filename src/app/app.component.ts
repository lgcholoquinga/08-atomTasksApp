import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SpinnerComponent } from '@common/components';
import { ToastService } from '@common/core/services';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'atm-root',
	imports: [RouterOutlet, ToastModule, SpinnerComponent],
	template: `<router-outlet /><p-toast /><atm-spinner /> `,
	providers: [ToastService],
})
export class AppComponent {}
