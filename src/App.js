import react from "react";
import Sentiment from "./senti";
import CountsByRegion from "./followerCountsByRegion";
import SentiAsCategories from "./commentscount";
import AssociationType from "./linkorgByAssociationType";
import CountsBySeniority from "./followerCountsBySeniority";
import CountsByIndustry from "./followerCountsByIndustry";
import CountsByStaffCountRange from "./followerCountsByStaffCountRange";
import CountsByFunction from "./followerCountsByFunction";
import CountsByCountry from "./followerCountsByCountry";
import OrgStatsLifetime from "./organisationStatsLifetime";

function App() {
  return (
    <div>
      <br />
      <br />
      {/* <AssociationType></AssociationType>
      <br />
      <CountsByRegion></CountsByRegion>
      <br />
      <CountsBySeniority></CountsBySeniority>
      <br />
      <CountsByIndustry></CountsByIndustry>
      <br />
      <CountsByStaffCountRange></CountsByStaffCountRange>
      <br />
      <CountsByFunction></CountsByFunction>
      <br />
      <CountsByCountry></CountsByCountry>
      <br />
      <OrgStatsLifetime></OrgStatsLifetime> */}
      <br />
      <Sentiment />
      {/* <br />
      <SentiAsCategories></SentiAsCategories>
      <br /> */}
      <br />
      <br />
    </div>
  );
}

export default App;
