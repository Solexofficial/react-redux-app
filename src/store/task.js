import { createSlice } from '@reduxjs/toolkit';
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
    set(state, action) {
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
const { update, remove, set } = actions;

export const completeTask = id => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export const getTasks = () => async dispatch => {
  try {
    const data = await todosService.fetchAll();
    console.log(data);
    dispatch(set(data));
  } catch (error) {
    console.log(error);
  }
};

export function titleChanged(id) {
  return update({ id, title: `New Title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export default taskReducer;
