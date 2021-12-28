const TASK_UPDATED = 'task/updated';
const TASK_DELETED = 'task/deleted';

export function taskCompleted(id) {
  return {
    type: TASK_UPDATED,
    payload: { id, completed: true },
  };
}

export function titleChanged(id) {
  return {
    type: TASK_UPDATED,
    payload: { id, title: `New Title for ${id}` },
  };
}

export function taskDeleted(id) {
  return {
    type: TASK_DELETED,
    payload: { id },
  };
}

function taskReducer(state = [], action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);

      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }
    case TASK_DELETED: {
      return state.filter(task => task.id !== action.payload.id);
    }
    default:
      return state;
  }
}

export default taskReducer;
