import React from "react";
import PropTypes from "prop-types";
import {
  BarChart as BChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// eslint-disable-next-line no-unused-vars
const BarChart = ({ data, barDataKeys, barDataFillColor }) => {
  const barDataFillColorPreDefined = ["#04B9A6", "#06ADCF", "#1C5D99"];
  if (!data.length) {
    return <p className="text-center">NO DATA FOUND</p>;
  } else {
    return (
      <ResponsiveContainer width="90%" height="90%">
        <BChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xAxisKey" />
          <YAxis />
          <Tooltip />
          <Legend />
          {barDataKeys.map((key, index) => {
            return (
              <Bar
                key={key}
                dataKey={key}
                fill={barDataFillColorPreDefined[index]}
              />
            );
          })}
        </BChart>
      </ResponsiveContainer>
    );
  }
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      xAxisKey: PropTypes.string,
    })
  ),
  barDataKeys: PropTypes.arrayOf(PropTypes.string),
  barDataFillColor: PropTypes.arrayOf(PropTypes.string),
};

export default React.memo(BarChart);
