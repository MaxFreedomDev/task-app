import { createSelector } from "reselect";
import { LocalData } from "../../utils/local-data";

export const getTasksSelector = (state) => {
  return state.tasks.tasks;
};

export const getNewTasksSelector = createSelector(
  [getTasksSelector],
  (tasks) => {
    return tasks.map((item) => ({
      ...item,
      statusName: LocalData.find((el) => el.id === item.status).name,
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
    return (status = LocalData.find((el) => el.id === status).name);
  }
);
