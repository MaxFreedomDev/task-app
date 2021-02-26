import React from "react";
import Dialog from "@material-ui/core/Dialog";
import StyledButton from "../common/styled-button";
import {
  DialogTitle,
  StyledDialogActions,
  StyledDialogContent,
} from "../common/styled-dialog-components";
import TextField from "@material-ui/core/TextField/TextField";
import { useForm } from "react-hook-form";
import { useActions } from "../../hooks/use-actions";

import "./tasks.scss";

const CreateTask = ({ open, handleClose, page, name, order }) => {
  const { register, handleSubmit, errors } = useForm();
  const { createNewTask } = useActions();
  const onSubmit = (data, e) => {
    const params = {
      sort_field: name,
      sort_direction: order,
      page: page + 1,
    };
    e.preventDefault();
    handleClose(!open);
    createNewTask(data, params);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(!open)}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle onClose={() => handleClose(!open)}>Новая задача</DialogTitle>
      <StyledDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputCreate">
            <TextField
              fullWidth
              id="username"
              label="Имя пользователя"
              margin="dense"
              name="username"
              autoComplete="none"
              variant="outlined"
              error={!!errors.username}
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
          <div className="inputCreate">
            <TextField
              fullWidth
              id="email"
              margin="dense"
              label="Почтовый адрес"
              name="email"
              variant="outlined"
              error={!!errors.email}
              inputRef={register({
                required: "поле не должно быть пустым",
                minLength: {
                  value: /S+@S+.S+/,
                  message: "неверный формат email",
                },
              })}
              type="email"
            />
            {errors.email && (
              <span role="alert" className="error">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="inputCreate">
            <TextField
              fullWidth
              multiline
              rows={4}
              id="text"
              label="Текст задачи"
              name="text"
              margin="dense"
              variant="outlined"
              error={!!errors.text}
              inputRef={register({
                required: "поле не должно быть пустым",
              })}
              type="text"
            />
            {errors.text && (
              <span role="alert" className="error">
                {errors.text.message}
              </span>
            )}
          </div>
          <StyledDialogActions>
            <StyledButton type="submit" variant="contained">
              Создать
            </StyledButton>
          </StyledDialogActions>
        </form>
      </StyledDialogContent>
    </Dialog>
  );
};

export default CreateTask;
