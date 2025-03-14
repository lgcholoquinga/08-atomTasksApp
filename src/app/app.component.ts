import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from '@common/core/services';

import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'atm-root',
	imports: [RouterOutlet, ToastModule],
	template: `<router-outlet /><p-toast /> `,
	providers: [ToastService],
})
export class AppComponent {}
