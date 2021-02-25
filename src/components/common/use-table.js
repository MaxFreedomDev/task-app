import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  table: {
    "& thead th": {
      fontWeight: 600,
      color: "black",
      backgroundColor: "#FEFEFE",
      whiteSpace: "nowrap",
    },
  },
}));

export default function useTable(
  records,
  headCells,
  totalRecordsCount,
  tasksParamsRequest
) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState();
  const [name, setName] = useState("username");

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = () => {
    const handleSortRequest = (cellId, nameCell) => {
      if (cellId === 2) {
        return setOrderBy(cellId);
      }
      if (nameCell === "text") {
        return null;
      }
      setOrder(order === "asc" ? "desc" : "asc");
      setOrderBy(cellId);
      setName(nameCell);
      const params = {
        sort_field: nameCell,
        sort_direction: order,
        page: page + 1,
      };
      tasksParamsRequest(params);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <TableSortLabel
                active={orderBy === 2 ? false : orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => {
                  handleSortRequest(headCell.id, headCell.name);
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const params = {
      sort_field: name,
      sort_direction: order === "asc" ? "desc" : "asc",
      page: newPage + 1,
    };
    tasksParamsRequest(params);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      count={totalRecordsCount}
      page={page}
      rowsPerPage={3}
      rowsPerPageOptions={[]}
      onChangePage={handleChangePage}
      labelDisplayedRows={({ from, to, count }) => {
        return "" + from + "-" + to + " из " + count;
      }}
    />
  );

  return {
    TblContainer,
    TblHead,
    TblPagination,
  };
}
