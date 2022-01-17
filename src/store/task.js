import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

// const update = createAction("task/updated");
// const remove = createAction("task/removed");

// const TASK_UPDATED = "task/updated";
// const TASK_DELETED = "task/deleted";

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestedFailed(state) {
      state.isLoading = false;
    },
    create(state, action) {
      state.entities = [...state.entities, ...[action.payload]];
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequestedFailed, taskRequested, create } =
  actions;

export const createTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.post();
    console.log(data);
    dispatch(create(data));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

// export function taskCompleted(id) {
//   return update({ id, completed: true });

//   //     return {
//   //     type: TASK_UPDATED,
//   //     payload: { id, completed: true },
//   //   };
// }

export function titleChanged(id) {
  return update({ id, title: `new titile for ${id}` });

  //   return {
  //     type: TASK_UPDATED,
  //     payload: { id, title: `new titile for ${id}` },
  //   };
}

export function taskDeleted(id) {
  return remove({ id });

  //   return {
  //     type: TASK_DELETED,
  //     payload: { id },
  //   };
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;

//второй этап
// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//       state[elementIndex] = { ...state[elementIndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((el) => el.id !== action.payload.id);
//     });
// });

// первый этап
// function taskReducer(state = [], action) {
//   switch (action.type) {
//     case TASK_UPDATED: {
//       const newArray = [...state];
//       const elementIndex = newArray.findIndex(
//         (el) => el.id === action.payload.id
//       );
//       newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
//       return newArray;
//     }
//     case TASK_DELETED: {
//       const newArray = [...state];
//       const updatedArray = newArray.filter((el) => el.id !== action.payload.id);
//       return updatedArray;
//     }
//     default:
//       return state;
//   }
// }

export default taskReducer;
