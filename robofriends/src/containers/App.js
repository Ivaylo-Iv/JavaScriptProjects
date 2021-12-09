import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ScrollComponent from "../components/ScrollComponent";
import "../style/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  async componentDidMount() {
    const data = await (
      await fetch("https://jsonplaceholder.cypress.io/users")
    ).json();
    this.setState({ robots: data });
  }

  onSearchChange = (e) => {
    this.setState({ searchfield: e.target.value });
  };
  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name.toLowerCase().includes(this.state.searchfield);
    });
    return (
      <div className="tc">
        <h1 className="f1">Robofriends</h1>
        <SearchBox SearchChange={this.onSearchChange} />
        <ScrollComponent>
          <CardList robots={filteredRobots} />
        </ScrollComponent>
      </div>
    );
  }
}

export default App;
