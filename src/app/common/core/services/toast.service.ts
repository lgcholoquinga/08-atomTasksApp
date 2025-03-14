import { inject, Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ToastLevel } from '../types';

@Injectable()
export class ToastService {
	private readonly messageService = inject(MessageService);

	showNotification(mode: ToastLevel, title: string, message: string) {
		this.messageService.add({ severity: mode, summary: title, detail: message });
	}
}
