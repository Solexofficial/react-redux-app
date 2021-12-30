import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/store';
import { completeTask, getTasks, taskDeleted, titleChanged } from './store/task';

const store = createStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  const changeTitle = taskId => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = taskId => {
    store.dispatch(taskDeleted(taskId));
  };

  useEffect(() => {
    store.dispatch(getTasks());
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
            <p>{`${el.id}. ${el.title}`}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>Complete</button>
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
