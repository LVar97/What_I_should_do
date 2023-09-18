import { WithId } from './WithId';

export interface Task extends WithId {
	text: string;
	isDone: boolean;
}
