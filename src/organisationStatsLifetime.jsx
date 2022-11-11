import React, { useEffect, useState } from "react";
import axios from "axios";
import { DownloadExcel } from "react-excel-export";

//npm install react-excel-export --save --force

const OrgStatsLifetime = () => {
  const [data, setData] = useState([]);

  const cleanData = (responce) => {
    const resultArray = [];
    let sentimentObject = {};
    let resp =
      responce?.data?.stats?.linkedin?.timelineStats?.organisationStatsLifetime;
    console.log(resp);
    resp.map((dailysplit) => {
      sentimentObject["uniqueImpressionsCount"] =
        dailysplit["uniqueImpressionsCount"];
      sentimentObject["shareCount"] = dailysplit["shareCount"];
      sentimentObject["shareMentionsCount"] = dailysplit["shareMentionsCount"];
      sentimentObject["engagement"] = dailysplit["engagement"];
      sentimentObject["clickCount"] = dailysplit["clickCount"];
      sentimentObject["likeCount"] = dailysplit["likeCount"];
      sentimentObject["impressionCount"] = dailysplit["impressionCount"];
      sentimentObject["commentMentionsCount"] =
        dailysplit["commentMentionsCount"];
      sentimentObject["organization_id"] = dailysplit["organization_id"];
      resultArray.push(sentimentObject);
      sentimentObject = {};
    });
    setData(resultArray);
  };

  const getData = async () => {
    axios
      .get(
        "https://alivecore360.com/api/stats/v5?key=d16b94a6-ed52-48db-9655-19136c9b45cf&organization_id=35686945&days=15&linkedin_token=AQVkSwrBxdWmY97f8g7r8xdymrzaC0jCBUwv-DjjyXHAAPoMC0POZVdicVP3mAvjc612Wn-cntF0agXFz09qSFv_8OQ6izALWIRbFKjgnZ7q9XHCcvaQkcS19aUVcKgh9hE7-nbWp5YGHpIY9zqlNX_RiNmObX5sa3fb6drQKANtnkGQMdT6895AjkeCv9e5xF9e4407w7UfinVLnvwx71j6uZp_c9yzYjwfUqlxbedETcSEp9qI9nXU5rxcgLAYZ-nK9liPJ6Qb-rGzwzfAVsdgNFRxiOXWDLvwx2FEJg1pEDGF4Sv2mzwlzVg6qYffrwBpeR8nOIuSSgVmlh7g-5_o9rtHrA&interval=day&type=organisationStats,sentiment"
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
            title="OrgStatsLifetime"
            data={data}
            fileName="OrgStatsLifetime"
            buttonLabel="OrgStatsLifetime"
            className="export-button"
          />
        </>
      )}
    </>
  );
};

export default OrgStatsLifetime;
