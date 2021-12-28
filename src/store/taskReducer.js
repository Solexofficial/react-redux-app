import * as actions from './actionTypes';

export function taskReducer(state = [], action) {
  switch (action.type) {
    case actions.taskUpdated: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);

      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }
    case actions.taskDeleted: {
      const newArray = [...state];
      return newArray.filter(task => task.id !== action.payload.id);
    }
    default:
      return state;
  }
}
