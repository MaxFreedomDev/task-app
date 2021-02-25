import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "react-redux";
import VisibilityOn from "@material-ui/icons/VisibilityOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import StyledButton from "../common/styled-button";

import "./login.scss";

const Login = () => {
  const { signIn } = useActions();
  const { error } = useSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    signIn(data);
  };
  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2>Авторизация</h2>
        {error && <div className="errorServer">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
          <div className="inputLogin">
            <TextField
              fullWidth
              id="username"
              label="Логин"
              name="username"
              autoComplete="none"
              variant="outlined"
              error={!!errors.login}
              inputRef={register({
                required: "поле не должно быть пустым",
              })}
              type="text"
            />
            {errors.username && (
              <span role="alert" className="error">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="inputLogin">
            <TextField
              fullWidth
              id="password"
              label="Пароль"
              name="password"
              variant="outlined"
              error={!!errors.password}
              inputRef={register({
                required: "поле не должно быть пустым",
                minLength: {
                  value: 3,
                  message: "минимум 3 символа",
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setPasswordShown(!passwordShown)}
                    >
                      {passwordShown ? <VisibilityOn /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={passwordShown ? "text" : "password"}
            />
            {errors.password && (
              <span role="alert" className="error">
                {errors.password.message}
              </span>
            )}
          </div>
          <StyledButton type="submit" variant="contained">
            Войти
          </StyledButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
