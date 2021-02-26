import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksRequest } from "../../store/action-creators/tasks";
import useTable from "../common/use-table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import "./tasks.scss";
import styled from "styled-components";
import StyledButton from "../common/styled-button";
import CreateTask from "./create-task";
import { getNewTasksSelector } from "../../store/selectors/tasks-selectors";
import ChangeTask from "./change-task";
import { useLocalStorage } from "../../hooks/use-local-storage";

const headCells = [
  { id: 0, disablePadding: false, label: "Имя пользователя", name: "username" },
  { id: 1, name: "email", disablePadding: false, label: "Email" },
  {
    id: 2,
    name: "text",
    disablePadding: true,
    label: "Текст задачи",
  },
  { id: 3, name: "status", disablePadding: false, label: "Статус задачи" },
];

const StyledTableCell = styled(TableCell)`
  && {
    min-width: 200px;
  }
`;

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => getNewTasksSelector(state));
  const { loading, count } = useSelector((state) => state.tasks);
  const { authentication } = useSelector((state) => state.auth);
  const [openCreate, setOpenCreate] = useState(false);
  const [task, setTask] = useState(null);
  const [page, setPage] = useLocalStorage("page", 0);
  const [name, setName] = useLocalStorage("name", "username");
  const [order, setOrder] = useLocalStorage("order", "asc");

  const { TblContainer, TblHead, TblPagination } = useTable(
    tasks,
    headCells,
    count,
    page,
    setPage,
    name,
    setName,
    order,
    setOrder
  );

  useEffect(() => {
    dispatch(
      tasksRequest({
        sort_field: name,
        sort_direction: order,
        page: page + 1,
      })
    );
  }, [name, order, page, dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="btnWrapper">
        <StyledButton
          variant="contained"
          onClick={() => setOpenCreate(!openCreate)}
        >
          Создать задачу
        </StyledButton>
      </div>
      <div className="tableWrapper">
        <TblContainer>
          <TblHead />
          <TableBody>
            {tasks.map((row) => (
              <TableRow
                key={row.id}
                className="tableRow"
                onClick={() => setTask(row)}
              >
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <StyledTableCell>{row.text}</StyledTableCell>
                <TableCell>{row.statusName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>
      <CreateTask open={openCreate} handleClose={setOpenCreate} />
      {authentication && <ChangeTask handleClose={setTask} task={task} />}
    </>
  );
};

export default Tasks;
