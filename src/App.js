import React from "react";
import axios from "axios";
import './styles/index.css'

const apiWeatherKey = "a7e9b7cd83166d594a42858290bbc541";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city || "Tel Aviv",
      data: {},
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

    axios.get(url).then((res) => {
      if (res.status === 200) {
        this.setState({
          data: res.data,
        });
      }
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <input id='searchBar' type="search" onChange={this.handleChange}></input>
        <button id='searchButton' type="submit" onClick={this.handleSearch}>
          Search
        </button>
        {data.main ? (
          <div className='temp'>
            {data.name}, {data.sys.country}
            <br/>
            <br/>
            {data.main.temp}&deg;
            <br/>
            {data.weather[0].description.toUpperCase()}
            <br/>
            feels like {data.main.feels_like}&deg;
          </div>
        ) : (
          <div className='temp'>Loading...</div>
        )}
      </div>
    );
  }
}

export default Weather;
