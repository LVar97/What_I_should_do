import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';
import { RootStore } from '.';
import { WithId } from '../objects/WithId';

export enum ActionTypes {
	ADD = 'ADD',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
}

export interface IActionList<Type extends ActionTypes = ActionTypes, Payload = unknown> {
	type: Type;
	payload: Payload;
	store: keyof RootStore;
}

export interface IActionCreators<TEntity extends WithId> extends ActionCreatorsMapObject {
	add: (item: Partial<TEntity>) => void;
	update: (item: Partial<TEntity>) => void;
	delete: (item: Array<string>) => void;
}

export type ActionAdd<T> = IActionList<ActionTypes.ADD, { data: T }>;
export type ActionUpdate<T> = IActionList<ActionTypes.UPDATE, { data: T }>;
export type ActionDelete<T> = IActionList<ActionTypes.DELETE, { data: T }>;

export function isListAction(action: Action): action is IActionList {
	if (typeof action.type !== 'string') return false;

	const str = action.type as string;

	return (
		str === ActionTypes.ADD
		|| str === ActionTypes.UPDATE
		|| str === ActionTypes.DELETE
	);
}

export function getActionCreators<
	TEntity extends WithId,
>(store: keyof RootStore): IActionCreators<TEntity> {
	return {
		add: (item: Partial<TEntity>) => (dispatch: Dispatch<Action>) => {
			dispatch({
				type: ActionTypes.ADD,
				store,
				payload: { data: item },
			});
		},
		update: (item: Partial<TEntity>) => (dispatch: Dispatch<Action>) => {
			dispatch({
				type: ActionTypes.UPDATE,
				store,
				payload: { data: item },
			});
		},
		delete: (items: Array<string>) => (dispatch: Dispatch<Action>) => {
			dispatch({
				type: ActionTypes.DELETE,
				store,
				payload: { data: items },
			});
		},
	};
}