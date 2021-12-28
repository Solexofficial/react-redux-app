import * as actionsTypes from './actionTypes';

export function taskCompleted(id) {
  return {
    type: actionsTypes.taskUpdated,
    payload: { id, completed: true },
  };
}

export function titleChanged(id) {
  return {
    type: actionsTypes.taskUpdated,
    payload: { id, title: `New Title for ${id}` },
  };
}
