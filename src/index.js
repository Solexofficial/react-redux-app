import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import createStore from './store/store';
import { completeTask, getTasks, taskDeleted, titleChanged } from './store/task';

const store = createStore();

const App = () => {
  const state = useSelector(state => state);

  const changeTitle = taskId => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = taskId => {
    store.dispatch(taskDeleted(taskId));
  };

  useEffect(() => {
    store.dispatch(getTasks());
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
