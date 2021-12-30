export function loggerMiddleware({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      console.log('###next: ', next);
      console.log('###action: ', action);
      if (action.type === 'task/update') {
        return dispatch({ type: 'task/remove', payload: { ...action.payload } });
      }

      return next(action);
    };
  };
}
