import { v4 } from 'uuid';

import { Task } from '../src/objects/Task';
import { ActionTypes, IActionList } from '../src/store/actions';
import { ListState, listReducer } from '../src/store/reducer';

describe('todoReducer', () => {
	const newTask: Task = {
		id: v4(),
		text: '',
		isDone: false,
	}

	it('returns new state for "ADD" type', () => {
			const initialState: ListState<Task> = { data: [] };
			const updateAction: IActionList = { type: ActionTypes.ADD, payload: newTask, store: 'todoList' };
			const updatedState = listReducer(initialState, updateAction);
			expect(updatedState).toEqual({newTask: '', tasks: [{name: 'new task', isDone: false}]});
	});

	it('returns new state for "DELETE" type', () => {
		const task: Task = newTask;
		const initialState: ListState<Task> = { data: [task]};
		const updateAction: IActionList = { type: ActionTypes.DELETE, payload: task, store: 'todoList' };
		const updatedState = listReducer(initialState, updateAction);
		expect(updatedState).toEqual({newTask: '', tasks: []});
	});

	it('returns new state for "UPDATE" type', () => {
		const initialState: ListState<Task> = { data: [newTask]};
		const updateAction: IActionList = { type: ActionTypes.UPDATE, payload: { ...newTask, isDone: true }, store: 'todoList' };
		const updatedState = listReducer(initialState, updateAction);
		expect(updatedState).toEqual({newTask: 'new task', tasks: []});
	});

})