import React from "react";
import { useContactContext } from "../../context/contactContext";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CLOSE_ALERT_POPUP } from "../../actions/actions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertPopup = () => {
  const { openAlertPopup, dispatch, alertMessage, alertType } =
    useContactContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: CLOSE_ALERT_POPUP });
  };
  return (
    <Snackbar
      open={openAlertPopup}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ mt: 7 }}
    >
      <Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
export default AlertPopup;
