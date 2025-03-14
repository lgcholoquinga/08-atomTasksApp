import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from '@auth/core/services';
import { TaskService } from '@tasks/core/services/task.service';

import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'atm-task-layout',
	imports: [RouterOutlet, ButtonModule],
	templateUrl: './task-layout.component.html',
	providers: [TaskService],
})
export default class TaskLayoutComponent implements OnInit {
	private authService = inject(AuthService);
	private router = inject(Router);

	public emailUser = signal('');

	ngOnInit(): void {
		this.emailUser.set(this.authService.user()!.email);
	}

	onLogout() {
		this.authService.logout();
		this.router.navigateByUrl('/auth');
	}
}
