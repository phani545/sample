import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const Bchart = (props) => {
  return (
    <div>
      <BarChart width={500} height={450} data={props.data}>
        <Bar dataKey={props.bar} fill="lightblue" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={props.Xaxies} />
        <YAxis />
      </BarChart>
    </div>
  );
};

export default Bchart;
