import { applyMiddleware, createStore, compose } from 'redux';
import { loggerMiddleware } from './middleware/logger';
import taskReducer from './task';

const middlewareEnhancer = applyMiddleware(loggerMiddleware);

function configureStore() {
  return createStore(
    taskReducer,
    compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
}

export default configureStore;
