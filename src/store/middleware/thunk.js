export function thunk({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === 'function') {
        console.log(typeof action);
        action(dispatch, getState);
      } else {
        return next(action);
      }
    };
  };
}
