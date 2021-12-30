import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
];

// const update = createAction('task/updated');
// const remove = createAction('task/removed');

// const TASK_UPDATED = 'task/updated';
// const TASK_DELETED = 'task/deleted';

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
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
const { update, remove } = actions;

export const completeTask = id => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New Title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export default taskReducer;
