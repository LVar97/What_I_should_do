/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { v4 } from 'uuid';

import { App } from './App';
import { Task } from './objects/Task';
import { ActionTypes, IActionList } from './store/actions';
import { ListState, listReducer } from './store/reducer';

describe('App component', () => {
	it('adding tasks', () => {
		render(<App />);

		// добавляем задачи
		userEvent.type(screen.getByRole('textbox'), 'Покормить кота');
		userEvent.type(screen.getByRole('textbox'), 'Полить цветы');

		// проверяем отображение списка и элементов
		expect(screen.getByRole('list')).toBeInTheDocument();
		expect(screen.getByText('Покормить кота')).toBeInTheDocument();
		expect(screen.getByText('Полить цветы')).toBeInTheDocument();
	});

	it('toggle task status', () => {
		render(<App />);

		// добавляем задачу и делаем ее выполненной
		userEvent.type(screen.getByRole('textbox'), 'Полить цветы');
		userEvent.click(screen.getByTestId('toggle-active'));
	});
});

describe('listReducer', () => {
	const newTask: Task = {
		id: v4(),
		text: '',
		isDone: false,
	};

	it('returns new state for "ADD" type', () => {
		const initialState: ListState<Task> = { data: [] };
		const updateAction: IActionList = { type: ActionTypes.ADD, payload: newTask, store: 'todoList' };
		const updatedState = listReducer(initialState, updateAction);
		expect(updatedState).toEqual({ newTask: '', tasks: [{ name: 'new task', isDone: false }] });
	});

	it('returns new state for "DELETE" type', () => {
		const task: Task = newTask;
		const initialState: ListState<Task> = { data: [task] };
		const updateAction: IActionList = { type: ActionTypes.DELETE, payload: task, store: 'todoList' };
		const updatedState = listReducer(initialState, updateAction);
		expect(updatedState).toEqual({ newTask: '', tasks: [] });
	});

	it('returns new state for "UPDATE" type', () => {
		const initialState: ListState<Task> = { data: [newTask] };
		const updateAction: IActionList = { type: ActionTypes.UPDATE, payload: { ...newTask, isDone: true }, store: 'todoList' };
		const updatedState = listReducer(initialState, updateAction);
		expect(updatedState).toEqual({ newTask: 'new task', tasks: [] });
	});
});
