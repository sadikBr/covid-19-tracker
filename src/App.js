import React, { Component } from "react";
import "./App.css";
import MapContainer from "./components/MapContainer";
import ListOfCountries from "./components/ListOfCountries";
import Header from "./components/Header";
import InfoContainer from "./components/InfoContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      worldWide: {},
      countriesHistory: [],
      worldWideHistory: {},
      selected: "cases",
      selectedCountry: "World Wide",
      infoToDisplay: {},
      historyInfoToDisplay: {},
    };
  }

  getData(url) {
    return fetch(url).then((response) => response.json());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCountry !== this.state.selectedCountry) {
      if (this.state.selectedCountry === "World Wide") {
        this.setState({
          infoToDisplay: this.state.worldWide,
          historyInfoToDisplay: this.state.worldWideHistory,
        });
      } else {
        const info = this.state.countries.find(
          (country) => country.country === this.state.selectedCountry
        );
        const historyInfo = this.state.countriesHistory.find(
          (country) => country.country === this.state.selectedCountry
        );
        this.setState({
          infoToDisplay: info,
          historyInfoToDisplay: historyInfo,
        });
      }
    }
  }

  componentDidMount() {
    const countriesDataURL = "https://disease.sh/v3/covid-19/countries";
    this.getData(countriesDataURL).then((data) =>
      this.setState({
        countries: data.sort((a, b) => b.country - a.country),
      })
    );
    const worldWideDataURL = "https://disease.sh/v3/covid-19/all";
    this.getData(worldWideDataURL).then((data) =>
      this.setState({
        worldWide: data,
        infoToDisplay: data,
      })
    );
    const countriesHistoryDataURL =
      "https://disease.sh/v3/covid-19/historical?lastdays=120";
    this.getData(countriesHistoryDataURL).then((data) =>
      this.setState({
        countriesHistory: data,
      })
    );
    const worldWideHistoryDataURL =
      "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
    this.getData(worldWideHistoryDataURL).then((data) =>
      this.setState({
        worldWideHistory: data,
        historyInfoToDisplay: data,
      })
    );
  }

  handleClick(type) {
    this.setState({
      selected: type,
    });
  }

  handleChange(country) {
    this.setState({
      selectedCountry: country,
    });
  }

  render() {
    const position = [31.794525, -7.0849336];
    return (
      <>
        <div className="left-side">
          <Header
            handleChange={this.handleChange.bind(this)}
            selectedCountry={this.state.selectedCountry}
            countriesData={this.state.countries}
          />
          <InfoContainer
            infoToDisplay={this.state.infoToDisplay}
            handleClick={this.handleClick.bind(this)}
            selected={this.state.selected}
          />
          <MapContainer
            selected={this.state.selected}
            countriesInfo={this.state.countries}
            infoToDisplay={this.state.infoToDisplay}
            position={position}
          />
        </div>
        <ListOfCountries
          selected={this.state.selected}
          countriesData={this.state.countries}
          selectedCountry={this.state.selectedCountry}
          historyInfoToDisplay={this.state.historyInfoToDisplay}
        />
      </>
    );
  }
}

export default App;
