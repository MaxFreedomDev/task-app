import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import VisibilityOn from "@material-ui/icons/VisibilityOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import StyledButton from "../common/styled-button";

import "./login.scss";

const Login = () => {
  const errorServer = "какая то ошибка сервера";
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data.email, data.password);
    reset();
  };
  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2>Авторизация</h2>
        {errorServer && <div className="errorServer">{errorServer}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
          <div className="inputLogin">
            <TextField
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="none"
              variant="outlined"
              error={!!errors.login}
              inputRef={register({
                required: "поле не должно быть пустым",
              })}
              type="text"
            />
            {errors.login && (
              <span role="alert" className="error">
                {errors.login.message}
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
