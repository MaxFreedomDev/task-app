import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useActions } from "../../hooks/use-actions";

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
  },
  actions: {
    justifyContent: "center",
    paddingBottom: 15,
  },
  btn: {
    height: 30,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertBoundry = (props) => {
  const classes = useStyles();
  const { setTasksError, successfully } = useActions();
  const error = useSelector((state) => state.tasks.error);
  const done = useSelector((state) => state.tasks.successfully);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setTasksError(null);
      }, 5000);
    }
    if (done) {
      setTimeout(() => {
        successfully(null);
      }, 2000);
    }
  }, [done, error, setTasksError, successfully]);

  return (
    <>
      <div className={classes.root}>
        <Snackbar
          open={error !== null}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
        <Snackbar
          open={done !== null}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="success">{done}</Alert>
        </Snackbar>
      </div>
      {props.children}
    </>
  );
};

export default AlertBoundry;
