import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import createStore from './store/store';
import { completeTask, getTasks, taskDeleted, titleChanged } from './store/task';

const store = createStore();

const App = () => {
  const state = useSelector(state => state.tasks.entities);
  const isLoading = useSelector(state => state.tasks.isLoading);
  const error = useSelector(state => state.errors.entities[0]);
  const dispatch = useDispatch();

  const changeTitle = taskId => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = taskId => {
    dispatch(taskDeleted(taskId));
  };

  useEffect(() => {
    dispatch(getTasks());
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
