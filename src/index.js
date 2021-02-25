import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import ApiService from "./services/api-service";
import { Provider } from "react-redux";
import { store } from "./store";

export const apiService = new ApiService();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
