import React from "react";
import { BrowserRouter } from "react-router-dom";
import Row from "../row/row";
import AppRouter from "./app-router";
import AlertBoundry from "../alert-boundry/alert-boundry";

function App() {
  return (
    <BrowserRouter>
      <AlertBoundry>
        <Row>
          <AppRouter />
        </Row>
      </AlertBoundry>
    </BrowserRouter>
  );
}

export default App;
