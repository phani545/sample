import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 *
 * data => [{innerXAxisKey:general,outerXAxisKey: Date, positive:,negative:,neutral:}]
 * barDataKeys => ["general",covid, opportunity]
 *
 */
const BarMultiXAxisChart = ({
  data,
  barDataKeys,
  isMultiAxis,
  barDataFillColor,
}) => {
  if (!data.length) {
    return <p className="text-center">NO DATA FOUND</p>;
  } else {
    console.log("baraxisdata", JSON.stringify(data));

    const getInnerXAxis = (tickProps) => {
      const data = tickProps
        .split(" ")
        .map((data) => data[0])
        .join("");
      return data;
    };
    const prevDate = "";
    const getOuterXAxis = (tickProps) => {
      const { x, y, payload } = tickProps;
      const { value, offset } = payload;
      const pathX = Math.floor(x - offset) + 0.5;
      if (prevDate !== value)
        return (
          <>
            <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />
            <text x={x} y={y - 4} textAnchor="middle">{`${value}`}</text>
          </>
        );

      return null;
    };

    if (!data.length) {
      return <p className="text-center">NO DATA FOUND</p>;
    } else {
      return (
        <ResponsiveContainer>
          <BarChart
            width={data.length * 150}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="innerXAxisKey" tickFormatter={getInnerXAxis} />
            {isMultiAxis ? (
              <XAxis
                dataKey="outerXAxisKey"
                axisLine={false}
                tickLine={false}
                tick={getOuterXAxis}
                height={1}
                xAxisId="quarter"
                alignmentBaseline=""
              />
            ) : (
              ""
            )}
            <YAxis />
            <Tooltip />
            <Legend />
            {barDataKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={barDataFillColor[index]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }
};

// data should be arranged according to dates in ascending order

BarMultiXAxisChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      innerXAxisKey: PropTypes.string.isRequired,
      outerXAxisKey: PropTypes.string,
    })
  ),
  barDataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMultiAxis: PropTypes.bool.isRequired,
  xAxisId: PropTypes.string.isRequired,
  barDataFillColor: PropTypes.array.isRequired,
};

export default BarMultiXAxisChart;
