import { LOGIN_ROUTE, TASKS_ROUTE } from "./utils/constants";
import Login from "./components/login/login";
import Tasks from "./components/tasks/tasks";

export const publicRoutes = [
  {
    path: TASKS_ROUTE,
    Component: Tasks,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
