import { Routes } from '@angular/router';

export default [
	{
		path: '',
		loadComponent: () => import('./layout/task-layout/task-layout.component'),
		children: [
			{
				path: 'home',
				loadComponent: () => import('./pages/home/home.component'),
			},
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
		],
	},
] as Routes;
