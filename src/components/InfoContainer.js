import React from "react";
import InfoCard from "./InfoCard";

function InfoContainer(props) {
  return (
    <div className="info-container">
      <InfoCard
        title="Coronavirus Cases"
        today={props.infoToDisplay.todayCases}
        total={props.infoToDisplay.cases}
        handleClick={props.handleClick}
        selected={props.selected}
        type="cases"
      />
      <InfoCard
        title="Recovered"
        today={props.infoToDisplay.todayRecovered}
        total={props.infoToDisplay.recovered}
        handleClick={props.handleClick}
        selected={props.selected}
        type="recovered"
      />
      <InfoCard
        title="Deaths"
        today={props.infoToDisplay.todayDeaths}
        total={props.infoToDisplay.deaths}
        handleClick={props.handleClick}
        selected={props.selected}
        type="deaths"
      />
    </div>
  );
}

export default InfoContainer;
