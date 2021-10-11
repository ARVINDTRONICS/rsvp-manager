import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Button from "@material-ui/core/Button";
import classes from "./registeration.module.scss";
import { submitAttendee } from "../../services/index";
import { ToastMessage } from "../../components/ToastMessage";
const defaultState = {
  name: "",
  age: 25,
  dob: "1996-03-24",
  profession: "employed",
  guests: "0",
  locality: "",
  address: ""
};

export const Registeration = () => {
  const [formValues, setFormValues] = useState(defaultState);
  const [toast, setToast] = useState(false);
  const handleInput = (e) => {
    //calculate age based on DOB,disabled age selection
    if (e.target.name === "dob") {
      let currentYear = new Date().getFullYear();
      let age = currentYear - String(e.target.value).split("-")[0];
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
        age
      });
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let attendeeDetails = {};
    for (let [key, value] of formData.entries()) {
      attendeeDetails[key] = value;
    }
    await submitAttendee(attendeeDetails)
      .then((response) => {
        if (response.status === 200) {
          setFormValues(defaultState);
          setToast(true);
        }
      })
      .catch((response) => {});
  };

  return (
    <form className={classes.formWrap} onSubmit={handleSubmit}>
      <Typography
        sx={{ color: "warning.main" }}
        variant="h3"
        gutterBottom
        component="div"
      >
        RSVP Here !
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            id="name-input"
            name="name"
            label="Name"
            variant="outlined"
            type="text"
            required
            value={formValues.name}
            onChange={(e) => {
              handleInput(e);
            }}
            inputProps={{ maxLength: 25 }}
          />
        </Grid>
        <Grid item xs={4} md={6}>
          <TextField
            fullWidth
            id="age-input"
            name="age"
            variant="outlined"
            label="Age"
            type="number"
            value={formValues.age}
            disabled
          />
        </Grid>
        <Grid item xs={8} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="DOB"
            type="date"
            name="dob"
            value={formValues.dob}
            onChange={(e) => {
              handleInput(e);
            }}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>

        <Grid item xs={6} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Profession</FormLabel>
            <RadioGroup
              name="profession"
              value={formValues.profession}
              onChange={(e) => {
                handleInput(e);
              }}
              row
            >
              <FormControlLabel
                key="employed"
                value="employed"
                control={<Radio size="small" />}
                label="Employed"
              />
              <FormControlLabel
                key="student"
                value="student"
                control={<Radio size="small" />}
                label="Student"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={6}>
          <FormControl fullWidth>
            <InputLabel sx={{ mb: "0.5rem" }}>Guests</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              name="guests"
              value={formValues.guests}
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            variant="outlined"
            id="locality-input"
            name="locality"
            label="Locality"
            type="text"
            value={formValues.locality}
            onChange={(e) => {
              handleInput(e);
            }}
            required
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            name="address"
            value={formValues.address}
            onChange={(e) => {
              handleInput(e);
            }}
            label="Address"
            multiline
            rows={4}
            required
            placeholder={"Enter Address"}
          />
        </Grid>

        <Grid item md={12}>
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
      {toast && (
        <ToastMessage
          open={toast}
          variant="success"
          vertical="bottom"
          horizontal="center"
          message="Success"
          handleClose={() => {
            setToast(false);
          }}
        />
      )}
    </form>
  );
};
