import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { environment } from '@envs/environment';

import { catchError, map, Observable, throwError } from 'rxjs';
import { User, UserResponse } from '../interfaces';
import { AuthStatus } from '../enums';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _baseApiUrl = environment.apiBaseUrl + '/api/users';
	private readonly _http = inject(HttpClient);

	private _authStatus = signal<AuthStatus>(AuthStatus.checking);
	private _user = signal<User | null>(null);

	public user = computed<User | null>(() => this._user());
	public authStatus = computed<AuthStatus>(() => {
		if (this._authStatus() === AuthStatus.checking) return AuthStatus.checking;

		if (this._user()) {
			return AuthStatus.authenticated;
		}

		return AuthStatus.noAuthenticated;
	});

	public signIn(email: string): Observable<boolean> {
		const url = `${this._baseApiUrl}/${email}`;
		return this._http.get<UserResponse>(url).pipe(
			map(({ ok, data }) => {
				if (ok) {
					this.handleAuthSuccess(data);
				}

				return ok;
			}),
			catchError((err) => {
				this.logout();
				return throwError(() => err);
			}),
		);
	}

	public create(email: string): Observable<boolean> {
		return this._http.post<UserResponse>(this._baseApiUrl, { email }).pipe(
			map(({ ok, data }) => {
				if (ok) {
					this.handleAuthSuccess(data);
				}

				return ok;
			}),
			catchError((err) => {
				this.logout();
				return throwError(() => err);
			}),
		);
	}

	public logout() {
		localStorage.clear();
		this._user.set(null);
		this._authStatus.set(AuthStatus.noAuthenticated);
	}

	private handleAuthSuccess(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
		this._user.set(user);
		this._authStatus.set(AuthStatus.authenticated);
		return true;
	}
}
