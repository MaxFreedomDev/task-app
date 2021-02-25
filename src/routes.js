import { LOGIN_ROUTE, TASKS_ROUTE } from "./utils/constants";
import Login from "./components/login/login";
import Tasks from "./components/tasks/tasks";

export const privateRoutes = [
  {
    path: TASKS_ROUTE,
    Component: Tasks,
  },
];
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
