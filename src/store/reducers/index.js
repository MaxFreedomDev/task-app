import { combineReducers } from "redux";
import { authReducer } from "./auth-reducer";
import { tasksReducer } from "./tasks-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});
