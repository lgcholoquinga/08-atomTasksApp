import { Routes } from '@angular/router';

export const auth_routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./layout/auth-layout/auth-layout.component'),
		children: [
			{
				path: 'signin',
				loadComponent: () => import('./pages/signin/signin.component'),
			},
			{
				path: '',
				redirectTo: 'signin',
				pathMatch: 'full',
			},
		],
	},
];

export default auth_routes;
