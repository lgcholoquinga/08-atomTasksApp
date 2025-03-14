import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';

import { NgxValidators } from '@common/core/validators';
import { FormControlErrorDirective, FormSubmitDirective } from '@common/core/directives';
import { Subject, takeUntil } from 'rxjs';

import { TaskService } from '@tasks/core/services/task.service';
import { AuthService } from '@auth/core/services';
import { ToastService } from '@common/core/services';
import { ActionForm } from '@common/core/types';
import { Task } from '@tasks/core/interfaces';

@Component({
	selector: 'atm-task-form',
	imports: [
		ButtonModule,
		InputTextModule,
		FloatLabelModule,
		TextareaModule,
		DividerModule,
		ReactiveFormsModule,
		FormSubmitDirective,
		FormControlErrorDirective,
	],
	templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnDestroy {
	public title = input<string>();
	public action = input<ActionForm>('create');
	public currentTask = input<Task | null>();

	private fb = inject(FormBuilder);
	private destroy$ = new Subject<void>();
	private taskService = inject(TaskService);
	private authService = inject(AuthService);
	private toastService = inject(ToastService);

	form = this.fb.nonNullable.group({
		title: ['', [NgxValidators.required('Title field is required'), NgxValidators.minLength(3)]],
		description: ['', [NgxValidators.required('Description field is required'), NgxValidators.minLength(3)]],
	});

	constructor() {
		effect(() => {
			if (this.currentTask()) {
				this.form.patchValue({ title: this.currentTask()?.title, description: this.currentTask()?.description });
			} else {
				this.form.reset();
			}
		});
	}

	public onSubmit() {
		if (this.action() === 'create') {
			this.onSave();
		} else {
			this.onUpdate();
		}
	}

	private onSave() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const currentUser = this.authService.user();
		if (currentUser == null) return;

		const { title, description } = this.form.getRawValue();
		this.taskService
			.create(title, description, currentUser.email)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (response) => {
					this.form.reset();
					if (response) {
						this.toastService.showNotification('success', 'Task', 'Task created successfully.');
						return;
					}

					this.showErroMessage();
				},
				error: () => this.showErroMessage(),
			});
	}

	private onUpdate() {
		this.taskService
			.updateTask(this.currentTask()!.id, this.form.getRawValue())
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => {
					this.toastService.showNotification('success', 'Task', 'Task updated successfully.');
				},
				error: (message) => this.toastService.showNotification('error', 'Error', message),
			});
	}

	private showErroMessage() {
		this.toastService.showNotification('error', 'Error', 'Error while creating a task');
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}
}
