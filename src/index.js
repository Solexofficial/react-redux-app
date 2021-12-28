import React, { useEffect, useState } from 'react';
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
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

const store = createStore(taskReducer, [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: false },
]);

const App = () => {
  const [state, setState] = useState(store.getState());
  const completeTask = taskId => {
    store.dispatch({ type: 'task/completed', payload: { id: taskId } });
  };

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  return (
    <>
      <h1>APP</h1>
      <ul>
        {state.map(el => (
          <li key={el.id}>
            <p>{el.description}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
