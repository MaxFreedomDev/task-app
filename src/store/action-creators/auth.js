import { apiService } from "../../index";
import axios from "axios";

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
      axios.defaults.headers.common = {
        Authorization: `Bearer ${response.message.token}`,
      };
      localStorage.setItem("token", response.message.token);
      dispatch(setAuth(true));
    }
  });
};

export const checkToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
    dispatch(setAuth(true));
  }
};

export const signOut = () => (dispatch) => {
  dispatch(setAuth(false));
  localStorage.removeItem("token");
  axios.defaults.headers.common = {
    Authorization: "",
  };
};
