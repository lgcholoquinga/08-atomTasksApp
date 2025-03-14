import { Component, effect, inject, signal } from '@angular/core';
import { ActionForm } from '@common/core/types';

import { TaskFormComponent, TaskTableComponent } from '@tasks/components';
import { Task } from '@tasks/core/interfaces';
import { TaskService } from '@tasks/core/services/task.service';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
	selector: 'atm-home',
	imports: [DividerModule, TaskFormComponent, TaskTableComponent, ButtonModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export default class HomeComponent {
	public titleForm = signal<string>('Create new task');
	public actionForm = signal<ActionForm>('create');

	public tasks = signal<Task[]>([]);
	public taskSelected = signal<Task | null>(null);

	private taskService = inject(TaskService);

	constructor() {
		effect(() => {
			this.tasks.set(this.taskService.tasks());
		});
	}

	public onUpdateTask(task: Task) {
		this.titleForm.set('Update Task');
		this.actionForm.set('update');
		this.taskSelected.set(task);
	}

	public onNewTask() {
		this.titleForm.set('Create new task');
		this.actionForm.set('create');
		this.taskSelected.set(null);
	}
}
