import { Component, inject, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';

import { NgxValidators } from '@common/core/validators';
import { FormControlErrorDirective, FormSubmitDirective } from '@common/core/directives';
import { Subject, takeUntil } from 'rxjs';

import { TaskService } from '@tasks/core/services/task.service';
import { AuthService } from '@auth/core/services';
import { ToastService } from '@common/core/services';

@Component({
	selector: 'atm-task-form',
	imports: [
		ButtonModule,
		InputTextModule,
		FloatLabelModule,
		TextareaModule,
		ReactiveFormsModule,
		FormSubmitDirective,
		FormControlErrorDirective,
	],
	templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnDestroy {
	private fb = inject(FormBuilder);
	private destroy$ = new Subject<void>();
	private taskService = inject(TaskService);
	private authService = inject(AuthService);
	private toastService = inject(ToastService);

	form = this.fb.nonNullable.group({
		title: ['', [NgxValidators.required('Title field is required'), NgxValidators.minLength(3)]],
		description: ['', [NgxValidators.required('Description field is required'), NgxValidators.minLength(3)]],
	});

	onSave() {
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

	showErroMessage() {
		this.toastService.showNotification('error', 'Error', 'Error while creating a task');
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}
}
