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
      status: StatusData.find((el) => el.id === item.status).name,
    }));
  }
);
