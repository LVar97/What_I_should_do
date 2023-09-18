import React from 'react';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';

import { FilterType } from '@app/components/TodoList/TodoList';
import { Nullable } from '@app/objects/Options';
import { Task } from '@app/objects/Task';

interface FilterButtonsProps {
	filterKey: FilterType;
	onChange: (event: React.MouseEvent<HTMLElement>, newFilter: FilterType) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ filterKey, onChange }: FilterButtonsProps) => (
	<ToggleButtonGroup
		color="primary"
		value={filterKey}
		exclusive
		size="small"
		onChange={onChange}
		aria-label="sort"
	>
		<ToggleButton value={FilterType.ALL}>All</ToggleButton>
		<ToggleButton value={FilterType.ACTIVE}>Active</ToggleButton>
		<ToggleButton value={FilterType.COMPLETED}>Completed</ToggleButton>
	</ToggleButtonGroup>
);

interface ClearButtonProps {
	onDelete: (value: Array<string>) => void;
	values: Nullable<Array<Task>>;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ values, onDelete }: ClearButtonProps) => (
	<Button
		sx={{ marginLeft: 'auto' }}
		onClick={() => {
			const completedTasks = values?.filter((i: Task) => !i.isDone).map((w: Task) => w.id) ?? [];
			onDelete(completedTasks);
		}}
		disabled={!values?.length || (values && !values.filter((i: Task) => i.isDone).length)}
	>
		Clear completed
	</Button>
);
