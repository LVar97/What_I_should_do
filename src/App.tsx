import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { TodoList } from './components/TodoList/TodoList';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getActionCreators } from './store/actions';
import { v4 } from 'uuid';
import { Task } from './objects/Task';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const dispatch = useDispatch();
	const factory = bindActionCreators(getActionCreators<Task>('todoList'), dispatch);

  const submitHandler = () => {
    factory.add({ id: v4(), text: task, isDone: false });
    setTask('');
  }

  return (
   <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant='h1' mt={4} mb={1}>Todos</Typography>
      <Typography mb={4} color="darkgrey">(Click on text for edit)</Typography>
      <OutlinedInput
        placeholder='What should I remember to do?'
        fullWidth
        value={task}
        inputProps={{
          onKeyPress: (event) => {
            if (event.key === "Enter") {
              submitHandler();
              event.preventDefault();
            }
          },
        }}
        onChange={(event) => setTask(event.currentTarget.value)}
        onSubmit={submitHandler}
        endAdornment={
          <InputAdornment position="end">
            <Button
              type="submit"
              aria-label="add a new task"
              onClick={submitHandler}
            >
              Save
            </Button>
          </InputAdornment>
        }
      />
      <TodoList />
   </Container>
  );
}
