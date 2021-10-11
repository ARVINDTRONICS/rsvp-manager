import React, { useEffect, useState } from "react";
import classes from "./listing.module.scss";
import { getAttendees } from "../../services/index";
import UserCard from "../../components/UserCard";
import TextField from "@material-ui/core/TextField";
import { Loader } from "../../components/Loader";
import { Reports } from "../Reports";
import { ThemedButton } from "../../components/ThemedButton";
import PropTypes from "prop-types";

export const Listing = ({ logoutHandler }) => {
  const [attendeeList, setAttendeeList] = React.useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAttendeeList, setfilteredAttendeeList] = useState([]);
  const [showReports, setShowReports] = useState(false);

  //fetchAll Attendees on Load
  const fetchAttendees = async () => {
    setisLoading(true);
    let response = await getAttendees();
    if (response.status === 200) {
      setisLoading(false);
      setAttendeeList(response.data);
    } else {
      setisLoading(false);
    }
  };

  //filter Attendees on Search
  const filterAttendees = (e) => {
    setShowReports(false);
    setSearchTerm(e.target.value);
    setfilteredAttendeeList(
      attendeeList.filter((attendee) =>
        attendee.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  //execute on mount
  useEffect(() => {
    fetchAttendees();
  }, []);

  if (isLoading) {
    return (
      <Loader
        open={true}
        handleClose={() => {
          setisLoading(false);
        }}
      />
    );
  } else {
    const listToDisplay =
      searchTerm.length > 0 ? filteredAttendeeList : attendeeList;
    return (
      <div className={classes.attendeeWrap}>
        <div className={classes.logOut}>
          <ThemedButton
            size="small"
            onClick={() => {
              logoutHandler();
            }}
            variant="contained"
          >
            Logout
          </ThemedButton>
        </div>
        <div className={classes.attendeeSearch}>
          <TextField
            label="Search for a Attendee"
            variant="standard"
            value={searchTerm}
            onChange={(e) => {
              filterAttendees(e);
            }}
          />
          <ThemedButton
            onClick={() => {
              setShowReports(!showReports);
            }}
            size="small"
            variant="contained"
          >
            {showReports ? "get Dashboard" : "Get Reports"}
          </ThemedButton>{" "}
        </div>
        {showReports ? (
          <Reports data={attendeeList} />
        ) : (
          <div className={classes.attendeeList}>
            {listToDisplay &&
              listToDisplay.length > 0 &&
              listToDisplay.map((eachAttendee, index) => {
                return <UserCard key={index} details={eachAttendee} />;
              })}
            {listToDisplay.length === 0 && <h2>No attendees found ! </h2>}
          </div>
        )}
      </div>
    );
  }
};

export default Listing;

Listing.propTypes = {
  logoutHandler: PropTypes.func.isRequired
};
