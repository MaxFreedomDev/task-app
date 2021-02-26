import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useActions } from "../../hooks/use-actions";
import {
  DialogTitle,
  StyledDialogActions,
  StyledDialogContent,
} from "../common/styled-dialog-components";
import TextField from "@material-ui/core/TextField/TextField";
import StyledButton from "../common/styled-button";
import { Controller, useForm } from "react-hook-form";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { StatusData } from "../../utils/status-data";

const ChangeTask = ({ task, handleClose }) => {
  const { changeTask } = useActions();
  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = (data, e) => {
    const token = localStorage.getItem("token");
    const id = StatusData.find((el) => el.name === data.status).id;
    if (task.text !== data.text) {
      const status = id === 0 ? 1 : 11;
      const payload = {
        text: data.text,
        status: status,
        token: token,
      };
      changeTask(task.id, payload);
    } else changeTask(task.id, { ...data, status: id, token: token });
    e.preventDefault();
    handleClose(null);
  };

  return (
    <Dialog
      open={task !== null}
      onClose={() => handleClose(null)}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle onClose={() => handleClose(null)}>
        Редактировать задачу
      </DialogTitle>
      <StyledDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputCreate">
            <TextField
              fullWidth
              multiline
              defaultValue={task?.text}
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
          <FormControl component="fieldset">
            <FormLabel component="legend">Статус задачи</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              defaultValue={task?.statusName}
              name="status"
              as={
                <RadioGroup aria-label="status">
                  <FormControlLabel
                    value="задача не выполнена"
                    control={<Radio />}
                    label="задача не выполнена"
                  />
                  <FormControlLabel
                    value="задача выполнена"
                    control={<Radio />}
                    label="задача выполнена"
                  />
                </RadioGroup>
              }
            />
          </FormControl>
          <StyledDialogActions>
            <StyledButton type="submit" variant="contained">
              Сохранить
            </StyledButton>
          </StyledDialogActions>
        </form>
      </StyledDialogContent>
    </Dialog>
  );
};

export default ChangeTask;
