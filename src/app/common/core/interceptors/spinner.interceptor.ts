import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
	const spinnerSrv = inject(SpinnerService);
	spinnerSrv.show();
	return next(req).pipe(finalize(() => spinnerSrv.hide()));
};
