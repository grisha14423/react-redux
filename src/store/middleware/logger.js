export function logger(state) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      //   if (action.type === "task/update") {
      //     return dispatch({
      //       type: "task/remove",
      //       payload: { ...action.payload },
      //     });
      //   } изменяет свойства
      return next(action);
    };
  };
}
