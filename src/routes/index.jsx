// @flow
import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Loader } from "../components/Loader";

import { isAuthed } from "../services/index";
import Home from "../layouts/Home";
import Listing from "../layouts/Listing";
import { loginService } from "../services/";
import { logoutService } from "../services/";

const RSVProutes = () => {
  console.log("RSVProutes");
  const [auth, setAuth] = React.useState(false);

  const handleLogin = async (login) => {
    let res = await loginService(login);

    if (res.status === 200) {
      setAuth(true);
    }
  };
  const logoutHandler = async () => {
    let res = await logoutService();
    if (res.status === 200) {
      setAuth(false);
    }
  };
  const checkAuthStatus = async () => {
    let res = await isAuthed();
    console.log(res);
    if (res) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  React.useEffect(() => {
    checkAuthStatus();
  }, [auth]);

  return (
    <Router>
      <Suspense fallback={Loader}>
        <Switch>
          <Route
            path="/home"
            exact={true}
            render={(props) => {
              return <Home {...props} handleLogin={handleLogin} auth={auth} />;
            }}
          />
          <Route
            path="/list"
            exact={true}
            render={(props) => {
              if (!auth) {
                return (
                  <Home {...props} handleLogin={handleLogin} auth={auth} />
                );
              } else {
                return (
                  <Listing
                    {...props}
                    auth={auth}
                    logoutHandler={logoutHandler}
                  />
                );
              }
            }}
          />
          <Route
            path="/"
            exact={true}
            render={(props) => {
              return <Home {...props} handleLogin={handleLogin} auth={auth} />;
            }}
          />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RSVProutes;
