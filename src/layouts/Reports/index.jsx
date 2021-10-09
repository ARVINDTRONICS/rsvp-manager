import React, { useEffect } from "react";
import { chartService } from "../../services/reportService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { PieChart, Pie } from "recharts";
import Paper from "@mui/material/Paper";
import classes from "./reports.module.scss";
import PropTypes from "prop-types";

export const Reports = ({ data }) => {
  const [ageChart, setAgeChart] = React.useState([]);
  const [groupChart, setGroupChart] = React.useState([]);
  const [localityChart, setLocalityChart] = React.useState([]);
  const [professionChart, setProfessionChart] = React.useState([]);
  const [totalAttendeesCard, settotalAttendeesCard] = React.useState({});

  useEffect(() => {
    setAgeChart(chartService.prepareAgeChart(data));
    setGroupChart(chartService.prepareAverageGroupSizeCard(data));
    setLocalityChart(chartService.prepareLocalityChart(data));
    setProfessionChart(chartService.prepareProfessionChart(data));
    settotalAttendeesCard(chartService.prepareTotalSizeCard(data));
  }, [data]);

  return (
    <div className={classes.reportWrap}>
      <div className={classes.reportCard}>
        {totalAttendeesCard && (
          <Paper
            sx={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              color: "white",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#FF9231",
              minWidth: "200px",
              minHeight: "150px"
            }}
            elevation={3}
          >
            <h6>{`Total RSVP'ed : ${totalAttendeesCard.totalAttendees}`}</h6>
            <h6>{`Total Guest : ${totalAttendeesCard.totalguestsCount}`}</h6>
            <h6>{`Total Attendees : ${totalAttendeesCard.total}`}</h6>
          </Paper>
        )}
      </div>
      <div className={classes.reportChart}>
        {ageChart && (
          <BarComponent
            data={ageChart}
            xAxis={"name"}
            yAxis={"count"}
            color={"#F05283"}
          ></BarComponent>
        )}
      </div>

      <div className={classes.reportChart}>
        {localityChart && (
          <BarComponent
            data={localityChart}
            xAxis={"name"}
            yAxis={"count"}
            color={"#FFC432"}
          ></BarComponent>
        )}
      </div>
      <div className={classes.reportCard}>
        {groupChart && (
          <Paper
            sx={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              color: "white",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#FF9231",
              minWidth: "200px",
              minHeight: "150px"
            }}
            elevation={3}
          >
            <p>Average Group Size</p>
            <div>{groupChart}</div>
          </Paper>
        )}
      </div>

      <div className={classes.reportChart}>
        {professionChart && (
          <PieComponent
            data={professionChart}
            value={"count"}
            color={"#00AE8E"}
          ></PieComponent>
        )}
      </div>
    </div>
  );
};

Reports.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

const BarComponent = ({ data, xAxis, yAxis, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={400}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yAxis} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const PieComponent = ({ data, value, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey={value}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill={color}
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
