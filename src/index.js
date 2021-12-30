import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import createStore from './store/store';
import {
  completeTask,
  getTasksLoadingStatus,
  getTasks,
  loadTasks,
  taskDeleted,
  createTask,
  titleChanged,
} from './store/task';

const store = createStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  const changeTitle = taskId => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = taskId => {
    dispatch(taskDeleted(taskId));
  };

  const payload = {
    title: 'new task',
    completed: false,
  };

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>APP</h1>
      <ul>
        {state.map(el => (
          <li key={el.id}>
            <p>{`${el.id}. ${el.title}`}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete Task</button>
            <hr />
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(createTask(payload))}>Create Task</button>
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
