import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import "./row.scss";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOGIN_ROUTE, TASKS_ROUTE } from "../../utils/constants";

const Row = (props) => {
  const { authentication } = useSelector((state) => state.auth);
  const { signOut } = useActions();
  const logout = () => {
    signOut();
    props.history.push(LOGIN_ROUTE);
  };
  return (
    <div className="wrapper-app">
      <nav>
        <div className="logo">
          <AssignmentIcon />
          <Link to={TASKS_ROUTE}>Список задач</Link>
        </div>
        {authentication ? (
          <div className="logout" onClick={logout}>
            <span>Выйти</span>
            <ExitToAppIcon />
          </div>
        ) : (
          <Link to={LOGIN_ROUTE} className="logout">
            <span>Войти</span>
            <MeetingRoomIcon />
          </Link>
        )}
      </nav>
      <div className="app-content">{props.children}</div>
    </div>
  );
};

export default withRouter(Row);
