import React from "react";
import { Registeration } from "../../components/Registeration";

import { Login } from "../../components/Login";
import classes from "./home.module.scss";
import { ThemedButton } from "../../components/ThemedButton";
import PropTypes from "prop-types";

const Home = ({ handleLogin }) => {
  const [isLogin, setisLogin] = React.useState(false);

  return (
    <div className={classes.home}>
      <div className={classes.loginSwitch}>
        <ThemedButton
          onClick={() => {
            setisLogin(!isLogin);
          }}
          size="small"
          variant="contained"
        >
          {isLogin ? "Register for event" : "Login as Admin"}
        </ThemedButton>
      </div>
      {isLogin ? <Login handleLogin={handleLogin} /> : <Registeration />}
    </div>
  );
};

export default Home;

Home.propTypes = {
  handleLogin: PropTypes.func.isRequired
};
