import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 3, error: null, isLoaded: false, data: [] };
  }
  componentDidMount() {
    fetch(`https://api.opendota.com/api/teams/${this.state.value}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
        this.setState({ isLoaded: true });
      })
      .then((error) => {
        this.setState({ false: true });
        this.setState({ error });
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const data = this.state.data;

    return (
      <div className="App">
        <h1 className="title" align="start">
          Dota API test
        </h1>
        <form onSubmit={this.handleSubmit} align="start">
          <p className="subtitle">Input Dota 2 team_id:</p>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>

        {
          <div align="start">
            <div>
              <p>Name: {data.name}</p>
              <p>Rating: {data.rating}</p>
              <p>Wins: {data.wins}</p>
              <p>Losses: {data.losses}</p>
              <p>Last match time: {data.last_match_time}</p>
              <p>Tag: {data.tag}</p>
            </div>
            <div>
              <img src={data.logo_url} alt="logo" />
            </div>
          </div>
        }
      </div>
    );
  }
}
export default App;
