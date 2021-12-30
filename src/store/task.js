import { createAction, createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';

const initialState = [];

// const update = createAction('task/updated');
// const remove = createAction('task/removed');

// const TASK_UPDATED = 'task/updated';
// const TASK_DELETED = 'task/deleted';

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      return (state = action.payload);
    },
    update(state, action) {
      const elementIndex = state.findIndex(el => el.id === action.payload.id);
      state[elementIndex] = { ...state[elementIndex], ...action.payload };
    },
    remove(state, action) {
      return state.filter(task => task.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived } = actions;

const taskRequested = createAction('task/requested');
const taskRequestFailed = createAction('task/requestFailed');

export const completeTask = id => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export const getTasks = () => async dispatch => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetchAll();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
  }
};

export function titleChanged(id) {
  return update({ id, title: `New Title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export default taskReducer;
