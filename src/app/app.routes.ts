import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes'),
	},
	{
		path: 'tasks',
		loadChildren: () => import('./tasks/tasks.routes'),
	},
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	{
		path: '**',
		loadComponent: () => import('./common/pages/not-found/not-found.component'),
	},
];
