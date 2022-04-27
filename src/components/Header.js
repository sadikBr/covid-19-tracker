import React from "react";

function Header(props) {
  return (
    <div className="header">
      <h1>COVID-19 Tracker</h1>
      <select
        value={props.selectedCountry}
        onChange={(event) => props.handleChange(event.target.value)}
      >
        <option value="World Wide">World Wide</option>
        {props.countriesData.map((country) => (
          <option key={country.country} value={country.country}>
            {country.country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;
