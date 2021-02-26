import { apiService } from "../../index";
import { loadingTasks } from "./tasks";

const setAuth = (auth) => {
  return {
    type: "SET_AUTH",
    payload: auth,
  };
};
const setError = (error) => {
  return {
    type: "SET_ERROR",
    payload: error,
  };
};

export const signIn = (credentials) => (dispatch) => {
  apiService.login(credentials).then((response) => {
    if (response.status === "error") {
      return dispatch(setError(response.message?.password));
    }
    if (response.status === "ok") {
      localStorage.setItem("token", response.message.token);
      dispatch(setAuth(true));
      dispatch(loadingTasks());
    }
  });
};

export const checkToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(loadingTasks());
  if (token) {
    dispatch(setAuth(true));
  }
};

export const signOut = () => (dispatch) => {
  dispatch(setAuth(false));
  localStorage.removeItem("token");
};
