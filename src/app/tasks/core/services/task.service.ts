import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { environment } from '@envs/environment';
import { CreateTaskResponse, DeleteTaskResponse, Task, TaskResponse } from '../interfaces';

import { catchError, EMPTY, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '@auth/core/services';
import { User } from '@auth/core/interfaces';

@Injectable()
export class TaskService {
	private readonly _baseApiUrl = environment.apiBaseUrl + '/api/tasks';
	private readonly _http = inject(HttpClient);
	private readonly _authService = inject(AuthService);

	private _tasks = signal<Task[]>([]);
	public tasks = computed<Task[]>(() => this._tasks());
	public currenUser = signal<User | null>(null);

	constructor() {
		this.currenUser.set(this._authService.user());

		effect(() => {
			if (this.currenUser()) {
				this.getTasks().subscribe();
			}
		});
	}

	create(title: string, description: string, userId: string): Observable<boolean> {
		return this._http.post<CreateTaskResponse>(this._baseApiUrl, { title, description, userId }).pipe(
			map((res) => res.ok),
			switchMap((res) => {
				if (res) {
					return this.getTasks();
				}

				return EMPTY;
			}),
			map(() => true),
			catchError(() => {
				return throwError(() => 'Error while creating a task');
			}),
		);
	}

	getTasks(): Observable<void> {
		if (!this.currenUser()) return of();

		const url = `${this._baseApiUrl}/userId/${this.currenUser()!.email}`;
		return this._http.get<TaskResponse>(url).pipe(
			map((res) => {
				this._tasks.set(res.data);
				return;
			}),
			catchError(() => throwError(() => 'Error while getting tasks')),
		);
	}

	deleteTask(id: string): Observable<boolean> {
		const url = `${this._baseApiUrl}/${id}`;

		return this._http.delete<DeleteTaskResponse>(url).pipe(
			map((res) => res.ok),
			switchMap(() => this.getTasks()),
			map(() => true),
			catchError(() => throwError(() => 'Error while deleteing task')),
		);
	}
}
