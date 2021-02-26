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
  page,
  setPage,
  name,
  setName,
  order,
  setOrder
) {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState();

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
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      count={totalRecordsCount}
      page={totalRecordsCount === 0 ? 0 : page}
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
