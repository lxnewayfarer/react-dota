import React from "react";
import "./App.css";
import moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: null,
      isMatch: true,
      isLoaded: false,
      id: 0,
      data: [],
    };
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

  getAllData() {
    fetch(`https://api.opendota.com/api/teams`)
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
    this.getAllData();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  searcher(name, value){
    return name.toLowerCase().includes(value.toLowerCase())

  }
  
  selectData() {
    const founded = this.state.data.find(team => this.searcher(team.name, this.state.value));
    const index = this.state.data.findIndex(team => this.searcher(team.name, this.state.value));
    if (!founded){
      this.setState({ isMatch: false });
    } else {
      this.setState({ isMatch: true });
      this.setState({ id: index });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.selectData();
  }

  Form = () => (
    <form onSubmit={this.handleSubmit} align="start">
      <label className="label">
        Search team:
        <input
          type="text"
          value={this.state.value}
          placeholder={this.state.data[this.state.id].name}
          onChange={this.handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );

  Header = () => (
    <h1 className="title" align="start">
      Dota 2 teams API client
    </h1>
  );

  render() {
    const data = this.state.data[this.state.id];
    //const timestamp = new Date( 1370001284000 );
    //const last_match_time = moment(data.last_match_time).format("dd.mm.yyyy hh:MM:ss");

    if (!this.state.isLoaded)
      return (
        <div>
          <this.Header />
          <h1 className="subtitle">Loading...</h1>
        </div>
      );
    if (!this.state.isMatch)
      return (
        <div>
          <this.Header />
          <this.Form />
          <p>Team not found</p>
        </div>
      );
    return (
      <div className="App">
        <this.Header />
        <this.Form />

        {
          <table cellspacing="0" id="maket" align="start">
            <tr>
              <td id="leftcol">
                <div>
                  <p className="place" align="start">
                    Place: #{this.state.id + 1}
                  </p>
                  <p className="title" align="start">
                    Name: {data.name}
                  </p>
                  <p className="rating" align="start">
                    Rating: {data.rating}
                  </p>
                  <p className="wins" align="start">
                    Wins: {data.wins}
                  </p>
                  <p className="losses" align="start">
                    Losses: {data.losses}
                  </p>
                  <p className="last" align="start">
                    Last match:{" "}
                    {moment(data.last_match_time * 1000).format(
                      "DD.MM.YYYY H:mm:SS"
                    )}
                  </p>
                  <p className="tag" align="start">
                    Tag: {data.tag}
                  </p>
                </div>
              </td>
              <td valign="top">
                <div>
                  <img src={data.logo_url} alt="logo" />
                </div>
              </td>
            </tr>
          </table>
        }

        <div className="footer" align="start">
          <a href="https://github.com/lxnewayfarer/react-intro" align="start">
            GitHub
          </a>
          <a href="https://docs.opendota.com/" align="start">
            OpenDota API
          </a>
        </div>
      </div>
    );
  }
}
export default App;
