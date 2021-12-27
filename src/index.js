import React from 'react';
import ReactDOM from 'react-dom';

function taskReducer(state, action) {
  switch (action.type) {
    case 'task/completed':
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);
      newArray[elementIndex].completed = true;
      return newArray;

    default:
      break;
  }
}

function createStore(reducer, initialState) {
  let state = initialState;

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
  }
  return { getState, dispatch };
}

const store = createStore(taskReducer, [{ id: 1, description: 'Task 1', completed: false }]);

const App = () => {
  console.log(store.getState());

  const completeTask = () => {
    store.dispatch({ type: 'task/completed', payload: { id: 1 } });
    console.log(store.getState());
  };
  return (
    <>
      <h1>APP</h1>
      <button onClick={completeTask}>Complete</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
