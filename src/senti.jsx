import React, { useEffect, useState } from "react";
import axios from "axios";
import { DownloadExcel } from "react-excel-export";

//npm install react-excel-export --save --force

const Sentiment = () => {
  const [data, setData] = useState([]);

  const cleanData = (responce) => {
    const resultArray = [];
    let sentimentObject = {};
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
        "https://alivecore360.com/api/stats/v5?key=d16b94a6-ed52-48db-9655-19136c9b45cf&organization_id=35686945&days=10&linkedin_token=AQUeZHJOAfwzpduia-0Esf4WVAjw-FffV1OeU9rgvaZKYjbMjrYoHdz1_EXFoKT7GMWNrbPpUdGW8XhImGhqP90v41nrQdamB1i7yPidD6hzps8zEYAtJaVvIdnwikrZhqKNblMUl2QeL46-qhUF40a1gs2e4y9BS1NtF9KOoseWkNh-sNRD4IZ6VK_l618-BcqumpbL4Wr7r87-oRa5p4BX-i0wOYO89GpSJYABxAEkNohS9KhukpvHo0ys9wmx3qZM9TXWjd477Sn_OV4r2yIDeh0dLO5_uDtPWO0Dpbt-Ti0NAcEon2s3tj2vDylUdVxVUX7aefTegdqFz1tKuphiiLNaQw&interval=hour&type=detailed,comments,sentiments"
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
    <>
      {data && (
        <>
          <DownloadExcel
            title="Sentiment"
            data={data}
            fileName="sentiments"
            buttonLabel="Sentiment"
            className="export-button"
          />
        </>
      )}
    </>
  );
};

export default Sentiment;
