import { WithId } from '@app/objects/WithId';

export interface Task extends WithId {
	text: string;
	isDone: boolean;
}
