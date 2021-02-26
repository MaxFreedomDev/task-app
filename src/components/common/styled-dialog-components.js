import styled from "styled-components";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import StyledButton from "./styled-button";

const StyledDialogTitle = styled(MuiDialogTitle)`
  && {
    text-align: center;
    display: flex,
    font-size: 18px;
    font-weight: bold;
    color: #000000;
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    position: absolute;
    color: #f1512f;
    top: -5px;
    right: 0;
    &:hover {
      background: inherit;
    }
  }
`;

export const DialogTitle = (props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <StyledDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <StyledIconButton aria-label="close" onClick={onClose}>
          <CloseIcon fontSize="large" />
        </StyledIconButton>
      ) : null}
    </StyledDialogTitle>
  );
};

export const StyledDialogContent = styled(DialogContent)`
  && {
    padding: 20px 30px;
  }
`;
export const StyledDialogActions = styled(DialogActions)`
  && {
    justify-content: space-around;
    ${StyledButton} {
      width: 150px;
    }
  }
`;
