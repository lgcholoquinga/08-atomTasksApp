import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'atm-not-found',
	imports: [ButtonModule, RouterLink],
	templateUrl: './not-found.component.html',
})
export default class NotFoundComponent {}
