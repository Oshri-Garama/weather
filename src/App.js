import React from "react";
import axios from "axios";
import "./styles/weather.css";

const apiWeatherKey = "a7e9b7cd83166d594a42858290bbc541";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city || '',
      data: {},
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({
      city: event.target.value,
    });
  }

  handleSearch() {
    const units = "metric";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=${units}&appid=${apiWeatherKey}`;

    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            data: res.data,
            error: null,
          });
        }
      })
      .catch(() => {
        this.setState({
          error: `'${this.state.city}' is not a valid city`,
        });
      });
  }

  render() {
    const { error, data } = this.state;

    return (
      <div>
        <input
          id="search-bar"
          type="search"
          onChange={this.handleChange}
          placeholder="Tel Aviv"
        ></input>
        <button id="search-button" type="submit" onClick={this.handleSearch}>
          Search
        </button>
        {!error && data.main ? (
          <div className="output-container">
            <div>
              <span>
                {data.name}, {data.sys.country}
              </span>
              <p id="weather-description">
                {data.main.temp}&deg; {"\n"}
                {data.weather[0].description.toUpperCase()} {"\n"}
                feels like {data.main.feels_like}&deg;
              </p>
            </div>
          </div>
        ) : (
          <div>{error}</div>
        )}
      </div>
    );
  }
}

export default Weather;
