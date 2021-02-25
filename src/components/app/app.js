import React from "react";
import { BrowserRouter } from "react-router-dom";
import Row from "../row/row";
import AppRouter from "./app-router";

function App() {
  return (
    <BrowserRouter>
      <Row>
        <AppRouter />
      </Row>
    </BrowserRouter>
  );
}

export default App;
