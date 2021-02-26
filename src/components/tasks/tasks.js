import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";
import { tasksRequest } from "../../store/action-creators/tasks";
import useTable from "../common/use-table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import "./tasks.scss";
import styled from "styled-components";
import StyledButton from "../common/styled-button";
import CreateTask from "./create-task";

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
  const { tasksParamsRequest } = useActions();
  const { tasks, loading, count } = useSelector((state) => state.tasks);
  const [openCreate, setOpenCreate] = useState(false);

  const { TblContainer, TblHead, TblPagination } = useTable(
    tasks,
    headCells,
    count,
    tasksParamsRequest
  );

  useEffect(() => {
    dispatch(tasksRequest());
  }, [dispatch]);

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
              <TableRow key={row.id} className="tableRow">
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <StyledTableCell>{row.text}</StyledTableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>
      {openCreate && (
        <CreateTask open={openCreate} handleClose={setOpenCreate} />
      )}
      {/*<ChangeTask />*/}
    </>
  );
};

export default Tasks;
