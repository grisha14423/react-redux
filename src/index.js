import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTaskLoadingStatus,
  createTasks,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deletTitle = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  const createTask = (task, completed) => {
    dispatch(createTasks(task, completed));
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>app</h1>
      <button onClick={() => createTask()}>Create Task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              End task
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deletTitle(el.id)}>Delete title</button>
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
  document.getElementById("root")
);
