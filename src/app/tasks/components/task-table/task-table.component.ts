import { Component, inject, input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '@tasks/core/interfaces';

import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { Subject, takeUntil } from 'rxjs';

import { TaskService } from '@tasks/core/services/task.service';
import { ToastService } from '@common/core/services';

@Component({
	selector: 'atm-task-table',
	imports: [TableModule, ToggleSwitchModule, ButtonModule, FormsModule, ConfirmDialogModule],
	templateUrl: './task-table.component.html',
	providers: [ConfirmationService],
})
export class TaskTableComponent implements OnDestroy {
	private taskService = inject(TaskService);
	private toastService = inject(ToastService);
	private confirmationService = inject(ConfirmationService);
	private destroy$ = new Subject<void>();

	tasks = input.required<Task[]>();

	onChangeStatus(event: unknown) {
		console.log(event);
		console.log('cambioooo');
	}

	onDeleteTask(id: string) {
		this.confirmDeleteTask(id);
	}

	private confirmDeleteTask(id: string) {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete this task?',
			header: 'Confirmation',
			closable: true,
			closeOnEscape: true,
			rejectButtonProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true,
			},
			acceptButtonProps: {
				label: 'Confirm',
			},
			accept: () => {
				this.deleteTask(id);
			},
		});
	}

	deleteTask(id: string) {
		this.taskService
			.deleteTask(id)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => this.toastService.showNotification('info', 'Information', 'Task Deleted successfully.'),
				error: () => this.toastService.showNotification('error', 'Error', 'Error while deleteing task'),
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}
}
