import { apiService } from "../../index";

const setTasksError = (error) => {
  return {
    type: "SET_TASKS_ERROR",
    payload: error,
  };
};
const loadingTasks = () => {
  return {
    type: "LOADING_TASKS",
  };
};
export const setTasks = (tasks) => {
  return {
    type: "SET_TASKS",
    payload: tasks,
  };
};
export const setTotalCountTask = (count) => {
  return {
    type: "SET_TOTAL_COUNT_TASK",
    payload: count,
  };
};

export const tasksRequest = () => (dispatch) => {
  dispatch(loadingTasks());
  apiService.tasks().then((response) => {
    if (response.status === "error") {
      return dispatch(setTasksError(response.message));
    }
    dispatch(setTotalCountTask(response.message.total_task_count));
    dispatch(setTasks(response.message.tasks));
  });
};

export const tasksParamsRequest = (params) => (dispatch) => {
  apiService.tasksParams(params).then((response) => {
    if (response.status === "error") {
      return dispatch(setTasksError(response.message));
    }
    dispatch(setTotalCountTask(response.message.total_task_count));
    dispatch(setTasks(response.message.tasks));
  });
};

export const createNewTask = (payload) => (dispatch) => {
  apiService.createTask(payload).then((response) => {
    if (response.status === "error") {
      return dispatch(setTasksError(response.message));
    }
    dispatch(tasksRequest());
  });
};
