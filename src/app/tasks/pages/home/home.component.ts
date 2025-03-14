import { Component, effect, inject, signal } from '@angular/core';

import { TaskFormComponent, TaskTableComponent } from '@tasks/components';
import { Task } from '@tasks/core/interfaces';
import { TaskService } from '@tasks/core/services/task.service';

import { DividerModule } from 'primeng/divider';

@Component({
	selector: 'atm-home',
	imports: [DividerModule, TaskFormComponent, TaskTableComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export default class HomeComponent {
	private taskService = inject(TaskService);

	public tasks = signal<Task[]>([]);

	constructor() {
		effect(() => {
			this.tasks.set(this.taskService.tasks());
		});
	}
}
