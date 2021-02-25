import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./row.scss";

const Row = (props) => {
  const user = true;
  const logout = () => {
    console.log("logOut");
  };
  return (
    <div className="wrapper-app">
      <nav>
        {user && (
          <>
            <AssignmentIcon className="logo" />
            <div className="logout" onClick={logout}>
              <span>Выйти</span>
              <ExitToAppIcon />
            </div>
          </>
        )}
      </nav>
      <div className="app-content">{props.children}</div>
    </div>
  );
};

export default Row;
