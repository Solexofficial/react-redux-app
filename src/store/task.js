import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
    },
    remove(state, action) {
      const entities = state.entities.filter(task => task.id !== action.payload.id);
      return { ...state, entities };
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskRequested, taskRequestFailed } = actions;

export const completeTask = id => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export const getTasks = () => async dispatch => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetchAll();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export function titleChanged(id) {
  return update({ id, title: `New Title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export default taskReducer;
