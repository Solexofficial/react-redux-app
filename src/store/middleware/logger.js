export function logger(state) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // console.log('###state: ', state);
      // console.log('###next: ', next);
      // console.log('###action: ', action);

      return next(action);
    };
  };
}
