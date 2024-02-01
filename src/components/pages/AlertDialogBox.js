import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContactContext } from "../../context/contactContext";
import { closeDialogBox, deleteContact } from "../../actions/contactsActions";

const AlertDialogBox = () => {
  const { openAlertDialog, contactId, dispatch } = useContactContext();

  return (
    <React.Fragment>
      <Dialog
        open={openAlertDialog}
        onClose={() => {
          closeDialogBox(dispatch);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Contact"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure about the deletion decision?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeDialogBox(dispatch);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteContact(dispatch, contactId)}
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialogBox;
