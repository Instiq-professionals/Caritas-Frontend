import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ width: "100%", textAlign: "center" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function MyPromptDialog(props) {
  const [answer, setAnswer] = useState();
  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
    props.onChange(answer);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDialog || false}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClick={handleClose}
          style={{ color: props.positiveDialog ? "green" : "red" }}
        >
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
        <Typography
            gutterBottom
            style={{
              paddingTop: 100,
              paddingBottom: 100,
              width: "400px",
              textAlign: "center",
            }}
          >
            <TextField
             variant="outlined"
            multiline
            label="Reason for disapproval"
            placeholder="State the reason for disapproval"
            rows="3"
            value={answer}
            onChange={props.change}
            style={{ width: "100%" }}
          />
          {props.children}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={props.positive} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export const ApproveDialogue = (props) => {
  const [amount_approved, setAmountApproved] = useState('');
  const [approval_comment, setComment] = useState('');
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDialog || false}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClick={handleClose}
          style={{ color: props.positiveDialog ? "green" : "red" }}
        >
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={props.positive} color="primary">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}