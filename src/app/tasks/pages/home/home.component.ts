import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
	selector: 'atm-home',
	imports: [DividerModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export default class HomeComponent {}
