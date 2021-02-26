import { createSelector } from "reselect";
import { StatusData } from "../../utils/status-data";

export const getTasksSelector = (state) => {
  return state.tasks.tasks;
};

export const getNewTasksSelector = createSelector(
  [getTasksSelector],
  (tasks) => {
    return tasks.map((item) => ({
      ...item,
      statusName: StatusData.find((el) => el.id === item.status).name,
    }));
  }
);

export const getTaskSelector = createSelector(
  [(status) => status],
  (status) => {
    if (status === 11) {
      return (status = "задача выполнена");
    }
    if (status === 1) {
      return (status = "задача не выполнена");
    }
    return (status = StatusData.find((el) => el.id === status).name);
  }
);
