import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";

export default function UserCard({ details }) {
  const { name, locality, age, guests } = details;
  return (
    <Card
      varaint="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 350,
        margin: "1rem",
        border: "1px solid lightgray"
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name},{age}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {locality}
        </Typography>
        <Typography variant="body2">{`RSVP'ed with ${guests} Guests`}</Typography>
      </CardContent>
    </Card>
  );
}

UserCard.propTypes = {
  details: PropTypes.object.isRequired
};
