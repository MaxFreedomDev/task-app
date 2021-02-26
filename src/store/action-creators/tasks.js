import { apiService } from "../../index";

export const setTasksError = (error) => {
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
export const successfully = (text) => {
  return {
    type: "SUCCESSFULLY",
    payload: text,
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
      return dispatch(setTasksError(JSON.stringify(response.message)));
    }
    if (response.status === "ok") {
      dispatch(successfully("Задача успешно добавлена"));
      dispatch(tasksRequest());
    }
  });
};
