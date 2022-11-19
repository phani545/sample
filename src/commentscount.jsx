import React, { useEffect, useState } from "react";
import axios from "axios";
import { DownloadExcel } from "react-excel-export";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//npm install react-excel-export --save --force

const SentiAsCategories = () => {
  const [data, setData] = useState([]);
  const barDataKeys = ["positive", "negative", "neutral"];
  const barDataFillColor = ["#8884d8", "#82ca9d", "#822a9d"];
  const isMultiAxis = true;
  const xAxisId = "categorysentiment";

  const cleanData = (responce) => {
    const resultArray = [];
    let sentimentObject = {};

    let resp = responce?.data?.stats?.linkedin?.timelineStats?.timeline;
    resp.map((dailysplit) => {
      if (dailysplit["sentimentAsCategories"]["total"] > 0) {
        sentimentObject["date"] = dailysplit["date"];

        sentimentObject["positivecomments"] =
          dailysplit["sentimentAsCategories"]["positiveComments"];

        sentimentObject["neutralComments"] =
          dailysplit["sentimentAsCategories"]["neutralComments"];

        sentimentObject["negativeComments"] =
          dailysplit["sentimentAsCategories"]["negativeComments"];

        resultArray.push(sentimentObject);
        sentimentObject = {};
        console.log(resultArray);
      }
    });
    setData(resultArray);
  };

  console.log("Finaldata :", data);

  let fdata = [];
  console.log("values:", Object.values(data));

  for (var i in Object.entries(data)) {
    console.log("i :", data[i].date);
  }
  const getData = async () => {
    axios
      .get(
        "https://alivecore360.com/api/stats/v5?key=d16b94a6-ed52-48db-9655-19136c9b45cf&organization_id=35686945&days=20&linkedin_token=AQUeZHJOAfwzpduia-0Esf4WVAjw-FffV1OeU9rgvaZKYjbMjrYoHdz1_EXFoKT7GMWNrbPpUdGW8XhImGhqP90v41nrQdamB1i7yPidD6hzps8zEYAtJaVvIdnwikrZhqKNblMUl2QeL46-qhUF40a1gs2e4y9BS1NtF9KOoseWkNh-sNRD4IZ6VK_l618-BcqumpbL4Wr7r87-oRa5p4BX-i0wOYO89GpSJYABxAEkNohS9KhukpvHo0ys9wmx3qZM9TXWjd477Sn_OV4r2yIDeh0dLO5_uDtPWO0Dpbt-Ti0NAcEon2s3tj2vDylUdVxVUX7aefTegdqFz1tKuphiiLNaQw&interval=hour&type=detailed,comments,sentiments"
      )
      .then((responce) => {
        console.log(responce);
        cleanData(responce);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data && (
        <>
          <DownloadExcel
            title="sentimentAsCategories"
            data={data}
            fileName="sentimentAsCategories"
            buttonLabel="sentimentAsCategories"
            className="export-button"
          />
        </>
      )}
    </div>
  );
};

export default SentiAsCategories;
