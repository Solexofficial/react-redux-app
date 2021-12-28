import { createAction } from '@reduxjs/toolkit';

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

function taskReducer(state = [], action) {
  switch (action.type) {
    case update.type: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);

      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }
    case remove.type: {
      return state.filter(task => task.id !== action.payload.id);
    }
    default:
      return state;
  }
}

export default taskReducer;
