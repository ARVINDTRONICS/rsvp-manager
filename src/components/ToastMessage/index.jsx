import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ToastMessage = ({
  open,
  message,
  vertical,
  horizontal,
  handleClose
}) => {
  return (
    <Snackbar
      autoHideDuration={2500}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

ToastMessage.defaultProps = {
  open: false,
  message: "toast",
  vertical: "top",
  horizontal: "center"
};
ToastMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  vertical: PropTypes.string.isRequired,
  horizontal: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};
