import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
];

const update = createAction('task/updated');
const remove = createAction('task/removed');

// const TASK_UPDATED = 'task/updated';
// const TASK_DELETED = 'task/deleted';

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function titleChanged(id) {
  return update({ id, title: `New Title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

const taskReducer = createReducer(initialState, builder => {
  builder.addCase(update, (state, action) => {
    const elementIndex = state.findIndex(el => el.id === action.payload.id);
    state[elementIndex] = { ...state[elementIndex], ...action.payload };
  });
  builder.addCase(remove, (state, action) => {
    return state.filter(task => task.id !== action.payload.id);
  });
});

export default taskReducer;
