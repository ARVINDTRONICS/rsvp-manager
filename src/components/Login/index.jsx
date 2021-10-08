import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import classes from "./login.module.scss";
import PropTypes from "prop-types";
export const Login = ({ handleLogin }) => {
  const [login, setLogin] = useState({ email: "", password: "" });

  return (
    <form
      className={classes.loginWrap}
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(login);
      }}
    >
      <Typography
        sx={{ color: "warning.main" }}
        variant="h5"
        gutterBottom
        component="div"
      >
        Login as Admin !
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            required
            value={login.email}
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
            }}
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
            required
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>

        <Grid item sm={12} md={12}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};
