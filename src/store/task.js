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
    create(state, action) {
      console.log('create action:', action.payload);
      state.entities.push(action.payload);
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
    taskRequestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { create, update, remove, received, taskRequested, taskRequestFailed } = actions;

export const createTask = payload => async (dispatch, getState) => {
  const state = getState();
  const tasksLength = state.tasks.entities.length;

  try {
    const data = await todosService.create(payload);
    const newData = { ...data, id: tasksLength + 1 };
    dispatch(create(newData));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = id => dispatch => {
  dispatch(update({ id, completed: true }));
};

export const loadTasks = () => async dispatch => {
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

export const getTasks = () => state => state.tasks.entities;
export const getTasksLoadingStatus = () => state => state.tasks.isLoading;

export default taskReducer;
