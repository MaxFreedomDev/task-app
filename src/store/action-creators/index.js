import * as AuthActionCreators from "./auth";
import * as TasksActionCreators from "./tasks";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...AuthActionCreators,
  ...TasksActionCreators,
};
