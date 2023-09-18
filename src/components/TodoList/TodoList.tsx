import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { RootStore } from '@app/store';
import { Task } from '@app/objects/Task';
import { getActionCreators } from '@app/store/actions';
import { Nullable } from '@app/objects/Options';
import { ClearButton, FilterButtons } from '@app/components/TodoList/ActionButtons';
import { NoData } from '@app/components/UI/NoData/NoData';
import { ListContent } from '@app/components/TodoList/ListContent';

export enum FilterType {
	ALL = 'all',
	ACTIVE = 'active',
	COMPLETED = 'completed',
}

export const TodoList: React.FC = () => {
	const store = useSelector((state: RootStore) => state.todoList.data);
	const dispatch = useDispatch();
	const actions = bindActionCreators(getActionCreators<Task>('todoList'), dispatch);
	const [list, setList] = useState<Nullable<Array<Task>>>(store);
	const [filter, setFilter] = React.useState(FilterType.ALL);

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newFilter: FilterType,
	) => {
		setFilter(newFilter);

		switch (newFilter) {
		case FilterType.ACTIVE:
			setList(store?.filter((i) => !i.isDone) ?? null);
			break;
		case FilterType.COMPLETED:
			setList(store?.filter((i) => i.isDone) ?? null);
			break;

		default:
			setList(store);
		}
	};

	useEffect(() => {
		setList(store);
	}, [store]);

	return (
		<Card sx={{ minWidth: 310, marginTop: 2 }}>
			<CardContent>
				{list?.length ? <ListContent list={list} /> : <NoData />}
			</CardContent>
			<CardActions disableSpacing>
				<FilterButtons filterKey={filter} onChange={handleChange} />
				<ClearButton values={store} onDelete={actions.delete} />
			</CardActions>
		</Card>
	);
};
