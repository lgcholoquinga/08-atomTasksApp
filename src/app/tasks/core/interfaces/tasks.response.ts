import { Task } from './task.interface';

export interface TaskResponse {
	ok: boolean;
	data: Task[];
}
