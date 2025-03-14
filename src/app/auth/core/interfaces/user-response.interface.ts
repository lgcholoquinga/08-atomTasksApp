import { User } from './user.interface';

export interface UserResponse {
	ok: boolean;
	data: User;
}
