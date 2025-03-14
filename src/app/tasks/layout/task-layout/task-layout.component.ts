import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'atm-task-layout',
	imports: [RouterOutlet, ButtonModule],
	templateUrl: './task-layout.component.html',
})
export default class TaskLayoutComponent {}
