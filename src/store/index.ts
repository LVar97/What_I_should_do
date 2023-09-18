import {
	applyMiddleware,
	legacy_createStore as createStore,
	compose,
	combineReducers,
	AnyAction,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { Task } from '../objects/Task';

import { ListState, getListReducer } from './reducer';

export interface RootStore {
	todoList: ListState<Task>;
}

export const rootReducer = combineReducers({
	todoList: getListReducer<Task, 'todoList'>('todoList'),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)),
);
export type DispatchType<TKey extends keyof RootStore> = ThunkDispatch<RootStore[TKey], never, AnyAction>;
