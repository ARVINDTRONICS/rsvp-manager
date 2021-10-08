import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import "./assets/globalScss/index.scss";
import { Navbar } from "./components/Navbar";
import RSVProutes from "./routes/index";

ReactDOM.render(
  <React.StrictMode>
    <div id="main">
      <Navbar />
      <RSVProutes />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
