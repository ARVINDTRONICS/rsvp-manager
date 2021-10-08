import classes from "./navbar.module.scss";

import React from "react";
import eventBriteLogo from "../../assets/images/eventbriteLogo.jpg";

export const Navbar = () => {
  return (
    <>
      <div className={`${classes.navbar}`}>
        <div className={classes.logowrap}>
          <img src={eventBriteLogo} alt="eventBriteLogo"></img>
        </div>
      </div>
    </>
  );
};
