import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./row.scss";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "react-redux";

const Row = (props) => {
  const { authentication } = useSelector((state) => state.auth);
  const { signOut } = useActions();
  return (
    <div className="wrapper-app">
      <nav>
        <AssignmentIcon className="logo" />
        {authentication && (
          <div className="logout" onClick={() => signOut()}>
            <span>Выйти</span>
            <ExitToAppIcon />
          </div>
        )}
      </nav>
      <div className="app-content">{props.children}</div>
    </div>
  );
};

export default Row;
