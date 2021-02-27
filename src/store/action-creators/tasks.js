import { apiService } from "../../index";
import { signOut } from "./auth";

export const setTasksError = (error) => {
  return {
    type: "SET_TASKS_ERROR",
    payload: error,
  };
};
export const loadingTasks = () => {
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

export const tasksRequest = (params) => (dispatch) => {
  const initialParams = {
    sort_field: params?.sort_field || "username",
    sort_direction: params?.sort_direction || "asc",
    page: params?.page || 1,
  };
  apiService.tasks(initialParams).then((response) => {
    if (response.status === "error") {
      return dispatch(setTasksError(response.message));
    }
    dispatch(setTotalCountTask(response.message.total_task_count));
    dispatch(setTasks(response.message.tasks));
  });
};

export const createNewTask = (payload, params) => (dispatch) => {
  apiService.createTask(payload).then((response) => {
    if (response.status === "error") {
      return dispatch(setTasksError(JSON.stringify(response.message)));
    }
    if (response.status === "ok") {
      dispatch(successfully("Задача успешно добавлена"));
      dispatch(tasksRequest(params));
    }
  });
};
export const changeTask = (id, payload, params) => (dispatch) => {
  apiService.updateTask(id, payload).then((response) => {
    if (response.status === "error" && response.message.token) {
      dispatch(signOut());
      dispatch(setTasksError(JSON.stringify(response.message)));
    }
    if (response.status === "error") {
      return dispatch(setTasksError(JSON.stringify(response.message)));
    }
    if (response.status === "ok") {
      dispatch(tasksRequest(params));
    }
  });
};
