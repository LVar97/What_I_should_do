import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { Editable } from '@app/components/UI/Editable/Editable';
import { Nullable } from '@app/objects/Options';
import { Task } from '@app/objects/Task';
import { getActionCreators } from '@app/store/actions';

const EditableStyledField = styled(ListItemText, { shouldForwardProp: (prop) => prop !== 'isDone' })<{
	isDone: boolean,
}>(({ theme, isDone }) => ({
	color: `${isDone ? theme.palette.text.disabled : theme.palette.text.primary}`,
	textDecoration: `${isDone ? 'line-through' : 'none'}`,
}));

interface ListContentProps {
	list: Nullable<Array<Task>>;
}

export const ListContent: React.FC<ListContentProps> = ({ list }: ListContentProps) => {
	const dispatch = useDispatch();
	const actions = bindActionCreators(getActionCreators<Task>('todoList'), dispatch);

	return (
		<List sx={{ bgcolor: 'background.paper' }}>
			{list?.map((item: Task) => (
				<ListItem
					key={item.id}
					secondaryAction={(
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={() => actions.delete([item.id])}
						>
							<DeleteIcon color="error" />
						</IconButton>
					)}
					disablePadding
				>
					<ListItemIcon>
						<Checkbox
							edge="start"
							checked={item.isDone}
							tabIndex={-1}
							disableRipple
							inputProps={{ 'aria-labelledby': item.id }}
							onChange={(event) => actions.update({ ...item, isDone: event.currentTarget.checked })}
						/>
					</ListItemIcon>
					<Editable.Container>
						<Editable.View readOnly={item.isDone}>
							<EditableStyledField isDone={item.isDone} id={item.id} primary={item.text} />
						</Editable.View>

						<Editable.Edit>
							<TextField
								value={item.text}
								onChange={(event) => actions.update({ ...item, text: event.currentTarget.value })}
								autoFocus
								fullWidth
								size="small"
							/>
						</Editable.Edit>
					</Editable.Container>
				</ListItem>
			))}
		</List>
	);
};
