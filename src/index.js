import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as actions from './store/task/actions';
import configureStore from './store/store';

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  const completeTask = taskId => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = taskId => {
    store.dispatch(actions.titleChanged(taskId));
  };

  const deleteTask = taskId => {
    store.dispatch(actions.taskDeleted(taskId));
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
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete Task</button>
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
