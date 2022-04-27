import React from "react";
import HistoryDiagramme from "./HistoryDiagramme";

function ListOfCountries(props) {
  function sortByCases(list) {
    const copy = [...list];
    return copy.sort((a, b) => b.cases - a.cases);
  }

  return (
    <div className="right-side">
      <div className="countries-container">
        {sortByCases(props.countriesData).map((country, index) => {
          return (
            <div
              key={country.country}
              style={{ background: index % 2 === 0 ? "lightgray" : "white" }}
              className="country"
            >
              {country.country}{" "}
              <span className="cases-nbr">{country.cases}</span>
            </div>
          );
        })}
      </div>
      <HistoryDiagramme
        selectedCountry={props.selectedCountry}
        selected={props.selected}
        historyInfoToDisplay={props.historyInfoToDisplay}
      />
    </div>
  );
}

export default ListOfCountries;
