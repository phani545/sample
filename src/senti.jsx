import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DownloadExcel } from "react-excel-export";
import Bchart from "./Charts/bchart";

const Sentiment = () => {
  const [data, setData] = useState([]);

  const barDataKeys = ["positive", "negative", "neutral"];
  const barDataFillColor = ["#8884d8", "#82ca9d", "#822a9d"];
  const isMultiAxis = true;
  //const xAxisId = "categorysentiment";

  const cleanData = (responce) => {
    let sentimentObject = {};
    const resultArray = [];
    let resp = responce?.data?.stats?.linkedin?.timelineStats?.timeline;
    resp.map((dailysplit) => {
      if (dailysplit["meanSentiment"]) {
        sentimentObject["meanSentiment"] = dailysplit["meanSentiment"];
        sentimentObject["date"] = dailysplit["date"];
        resultArray.push(sentimentObject);
        sentimentObject = {};
      }
    });
    setData(resultArray);
  };
  const getData = async () => {
    axios
      .get(
        "https://alivecore360.com/api/stats/v5?key=d16b94a6-ed52-48db-9655-19136c9b45cf&organization_id=35686945&days=30&linkedin_token=AQUeZHJOAfwzpduia-0Esf4WVAjw-FffV1OeU9rgvaZKYjbMjrYoHdz1_EXFoKT7GMWNrbPpUdGW8XhImGhqP90v41nrQdamB1i7yPidD6hzps8zEYAtJaVvIdnwikrZhqKNblMUl2QeL46-qhUF40a1gs2e4y9BS1NtF9KOoseWkNh-sNRD4IZ6VK_l618-BcqumpbL4Wr7r87-oRa5p4BX-i0wOYO89GpSJYABxAEkNohS9KhukpvHo0ys9wmx3qZM9TXWjd477Sn_OV4r2yIDeh0dLO5_uDtPWO0Dpbt-Ti0NAcEon2s3tj2vDylUdVxVUX7aefTegdqFz1tKuphiiLNaQw&interval=hour&type=detailed,comments,sentiments"
      )
      .then((responce) => {
        console.log(responce);
        cleanData(responce);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  console.log("Original Data:", data);

  const fdata = [];
  if (data) {
    data.forEach((categorySentimentDataWithDate) => {
      console.log("1St loop", Object.entries(categorySentimentDataWithDate));
      let itemData = {
        innerXAxisKey: categorySentimentDataWithDate.meanSentiment,
        outerXAxisKey: categorySentimentDataWithDate.date,
        ...categorySentimentDataWithDate[1],
      };
      fdata.push(itemData);
    });
  }
  console.log("Fdata:", fdata);

  // onBarClick(bar) {
  //   this.setState({selectedBar : bar});
  // }
  // document.getElementById("Bchart").onclick = function (evt) {
  //   var activePoints = myRadar.getElementsAtEvent(evt);
  //   // use _datasetIndex and _index from each element of the activePoints array
  // };

  return (
    <>
      {data && (
        <div>
          <DownloadExcel
            title="Sentiment"
            data={data}
            fileName="Sentiment"
            buttonLabel="Sentiment"
            className="export-button"
          />
          <>
            <canvas id="chart" width="300" height="150">
              <Bchart data={data} bar="meanSentiment" Xaxies="date" />
            </canvas>
          </>
        </div>
      )}
    </>
  );
};

export default Sentiment;
