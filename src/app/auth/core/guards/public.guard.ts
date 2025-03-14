import { CanActivateFn } from '@angular/router';

export const publicGuard: CanActivateFn = (_route, _state) => {
	localStorage.clear();
	return true;
};
