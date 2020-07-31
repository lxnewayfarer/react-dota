import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 4, error: null, isLoaded: false, data: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getData() {
    fetch(`https://api.opendota.com/api/teams/${this.state.value}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
        this.setState({ isLoaded: true });
      })
      .then((error) => {
        this.setState({ false: true });
        this.setState({ error: error });
      });
  }
  componentDidMount() {
    this.getData();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
    this.getData();
    this.render();
  }

  render() {
    const data = this.state.data;

    if (!this.state.isLoaded) return <h1 className="subtitle">Loading...</h1>;
    return (
      <div className="App">
        <h1 className="title" align="start">
          Dota 2 teams API client
        </h1>
        <form onSubmit={this.handleSubmit} align="start">
          <label className="subtitle">
            team_id:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {
          <div align="start">
            <div>
              <p  className="title">Name: {data.name}</p>
              <p className="rating">Rating: {data.rating}</p>
              <p className="wins">Wins: {data.wins}</p>
              <p className="losses">Losses: {data.losses}</p>
              <p className="last">Last match time: {data.last_match_time}</p>
              <p className="tag">Tag: {data.tag}</p>
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
