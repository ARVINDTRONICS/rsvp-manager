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

  useEffect(() => {
    setAgeChart(chartService.prepareAgeChart(data));
    setGroupChart(chartService.prepareAverageGroupSizeCard(data));
    setLocalityChart(chartService.prepareLocalityChart(data));
    setProfessionChart(chartService.prepareProfessionChart(data));
  }, [data]);

  return (
    <div className={classes.reportWrap}>
      <div>
        {ageChart && (
          <BarComponent
            data={ageChart}
            xAxis={"name"}
            yAxis={"count"}
            color={"#F05283"}
          ></BarComponent>
        )}
      </div>

      <div>
        {localityChart && (
          <BarComponent
            data={localityChart}
            xAxis={"name"}
            yAxis={"count"}
            color={"#FFC432"}
          ></BarComponent>
        )}
      </div>
      <div>
        {groupChart && (
          <Paper
            sx={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              color: "white",
              backgroundColor: "#FF9231"
            }}
            elevation={3}
          >
            <p>Average Group Size</p>
            <div>{groupChart}</div>
          </Paper>
        )}
      </div>
      <div>
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
