import { createStore } from 'redux';
import taskReducer from './task';



function configureStore() {
  return createStore(taskReducer);
}

export default configureStore;
