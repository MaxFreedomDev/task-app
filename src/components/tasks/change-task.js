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
import { LocalData } from "../../utils/local-data";
import { getTaskSelector } from "../../store/selectors/tasks-selectors";

const ChangeTask = ({
  task,
  handleClose,
  open,
  status,
  text,
  setStatus,
  setText,
  page,
  name,
  order,
}) => {
  const { changeTask } = useActions();
  const newStatus = getTaskSelector(status);

  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = (data, e) => {
    const token = localStorage.getItem("token");
    const id = LocalData.find((el) => el.name === data.status).id;
    const params = {
      sort_field: name,
      sort_direction: order,
      page: page + 1,
    };
    if (task.text !== data.text) {
      const status = id === 0 ? 1 : 11;
      const payload = {
        text: data.text,
        status: status,
        token: token,
      };
      changeTask(task.id, payload, params);
    } else changeTask(task.id, { ...data, status: id, token: token }, params);
    e.preventDefault();
    handleClose(!open);
  };

  const radio = (value) => {
    const id = LocalData.find((el) => el.name === value).id;
    setStatus(id);
  };
  const changeText = (text) => {
    setText(text);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(!open)}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle onClose={() => handleClose(!open)}>
        Редактировать задачу
      </DialogTitle>
      <StyledDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputCreate">
            <TextField
              fullWidth
              multiline
              defaultValue={text}
              onChange={(e) => changeText(e.target.value)}
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
              defaultValue={newStatus}
              name="status"
              as={
                <RadioGroup aria-label="status">
                  <FormControlLabel
                    value="задача не выполнена"
                    control={<Radio />}
                    label="задача не выполнена"
                    onChange={(e) => radio(e.target.value)}
                  />
                  <FormControlLabel
                    value="задача выполнена"
                    control={<Radio />}
                    label="задача выполнена"
                    onChange={(e) => radio(e.target.value)}
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
