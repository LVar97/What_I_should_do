import * as React from 'react';

import Box from '@mui/material/Box';

type EditableProps = React.PropsWithChildren;
type ContainerProps = EditableProps & { edit?: boolean; };
type EditableViewProps = React.PropsWithChildren & { readOnly?: boolean; };

interface EditableContext {
	edit: boolean;
	setEdit: (value: boolean) => void;
}

const Context = React.createContext<EditableContext>({ edit: false, setEdit: console.log });

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
	const [edit, setEdit] = React.useState<boolean>(false);
	const value = React.useMemo(() => {
		const onSetEdit = (value: boolean) => {
			setEdit(props.edit || value);
		};

		return {
			edit: props.edit || edit,
			setEdit: onSetEdit,
		};
	}, [edit, props.edit]);

	return (
		<Context.Provider value={value}>
			{props.children}
		</Context.Provider>
	);
};

const Edit: React.FC<EditableProps> = (props: EditableProps) => {
	const context = React.useContext(Context);

	if (!context.edit) return null;

	return (
		<Box
			onBlur={() => context.setEdit(false)}
		>
			{props.children}
		</Box>
	);
};

const View: React.FC<EditableViewProps> = (props: EditableViewProps) => {
	const context = React.useContext(Context);

	if (context.edit) return null;

	return (
		<Box
			onClick={(event: React.MouseEvent<HTMLDivElement>) => {
				event.stopPropagation();
				if (!props.readOnly) context.setEdit(true);
			}}
		>
			{props.children}
		</Box>
	);
};

export const Editable = {
	Container,
	Edit,
	View,
};
