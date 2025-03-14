import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';

export const privateGuard: CanActivateFn = (_route, _state) => {
	const router = inject(Router);
	const authService = inject(AuthService);

	if (!authService.validateSession()) {
		router.navigateByUrl('/auth');
		return false;
	}

	return true;
};
