import React from "react";
import { Map, TileLayer, Circle, Popup } from "react-leaflet";

function MapContainer(props) {
  const center = props.infoToDisplay.countryInfo
    ? [
        props.infoToDisplay.countryInfo.lat,
        props.infoToDisplay.countryInfo.long,
      ]
    : props.position;
  return (
    <div className="map-container">
      <Map className="mapid" center={center} zoom={10}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.countriesInfo.map((country) => {
          return (
            <Circle
              key={country.country}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              color={
                props.selected === "cases"
                  ? "red"
                  : props.selected === "recovered"
                  ? "greenyellow"
                  : "gray"
              }
              radius={
                props.selected === "cases"
                  ? country.cases / 2
                  : props.selected === "recovered"
                  ? country.recovered / 2
                  : country.deaths / 2
              }
            >
              <Popup className="popup">
                <img src={country.countryInfo.flag} alt="flag" />
                <h1>{country.country}</h1>
                <p>Cases: {country.cases}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </Popup>
            </Circle>
          );
        })}
      </Map>
    </div>
  );
}

export default MapContainer;
