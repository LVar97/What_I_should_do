import { v4 } from 'uuid';

import { Nullable } from '../objects/Options';
import { WithId } from '../objects/WithId';
import {
	ActionAdd,
	ActionDelete,
	ActionTypes,
	ActionUpdate,
	IActionList,
} from './actions';
import { RootStore } from '.';

export interface ListState<TEntity> {
	data: Nullable<Array<TEntity>>;

}

const defaultState = {
	data: [
		{
			id: v4(),
			text: 'Find Will',
			isDone: false,
		},
		{
			id: v4(),
			text: 'Go on a date with 11',
			isDone: true,
		},
	],
};

export function listReducer<TEntity extends WithId>(state: ListState<TEntity> | undefined, action: IActionList) {
	if (!state) return defaultState;

	switch (action.type) {
	case ActionTypes.ADD: {
		const { payload }: ActionAdd<TEntity> = action as ActionAdd<TEntity>;

		const result = state?.data ? [payload.data, ...state?.data as Array<TEntity>] : [payload.data];

		return {
			data: result,
		};
	}
	case ActionTypes.UPDATE: {
		const { payload }: ActionUpdate<TEntity> = action as ActionUpdate<TEntity>;

		const updateValues = state.data?.map((i: TEntity) => {
			if (payload.data.id === i.id) return payload.data;

			return i;
		});

		return {
			data: updateValues,
		};
	}
	case ActionTypes.DELETE: {
		const { payload }: ActionDelete<Array<string>> = action as ActionDelete<Array<string>>;

		return {
			data: state.data?.filter((i: TEntity) => !payload.data.includes(i.id)),
		};
	}
	default:
		return state;
	}
}

export function getListReducer<TEntity extends WithId, TKey extends keyof RootStore>(store: TKey) {
	return (state: ListState<TEntity> | undefined, action: IActionList) => {
		if (store !== action.store) return state || defaultState;

		return listReducer<TEntity>(state, action);
	};
}
