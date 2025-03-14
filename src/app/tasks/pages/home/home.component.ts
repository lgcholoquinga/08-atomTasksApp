import { Component, effect, inject, signal } from '@angular/core';

import { TaskFormComponent } from '@tasks/components/task-form/task-form.component';
import { Task } from '@tasks/core/interfaces';
import { TaskService } from '@tasks/core/services/task.service';

import { DividerModule } from 'primeng/divider';

@Component({
	selector: 'atm-home',
	imports: [DividerModule, TaskFormComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export default class HomeComponent {
	private taskService = inject(TaskService);

	public tasks = signal<Task[]>([]);

	constructor() {
		effect(() => {
			if (this.taskService.tasks().length > 0) {
				this.tasks.set(this.taskService.tasks());
			}
		});
	}
}
