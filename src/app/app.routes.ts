import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from '@auth/core/guards';

export const routes: Routes = [
	{
		path: 'auth',
		title: 'Auth',
		canActivate: [publicGuard],
		loadChildren: () => import('./auth/auth.routes'),
	},
	{
		path: 'tasks',
		title: 'Tasks',
		canActivate: [privateGuard],
		loadChildren: () => import('./tasks/tasks.routes'),
	},
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	{
		path: '**',
		canActivate: [publicGuard],
		loadComponent: () => import('./common/pages/not-found/not-found.component'),
	},
];
