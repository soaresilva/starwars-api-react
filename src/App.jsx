import React, { Component } from "react";
import "./App.css";

const url = "https://swapi.co/api/people/20/";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      character: {},
      characterFilm: {}
    };
  }

  getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);
      this.setState({
        // ...data,
        loading: false,
        character: data
      });
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.message
      });
    }
  };

  getMovieData = async () => {
    const firstmovieurl = "https://swapi.co/api/films/2/";
    try {
      const response = await fetch(firstmovieurl);
      const firstmovie = await response.json();
      console.log("data", firstmovie);
      this.setState({
        // ...data,
        loading: false,
        characterFilm: firstmovie
      });
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.message
      });
    }
  };

  componentDidMount() {
    this.getData();
    this.getMovieData();
  }

  render() {
    console.log("this.state", this.state);
    // console.log("this.state", this.state.characterFilm.title);
    return (
      <div className="App">
        <div className="charinfo">
          <div>
            <strong>Name:</strong> {this.state.character.name}
          </div>
          <div>
            <strong>Birth year:</strong> {this.state.character.birth_year}
          </div>
          <div>
            <strong>Skin color:</strong> {this.state.character.skin_color}
          </div>
          <div>
            <strong>Height:</strong> {this.state.character.height}
          </div>
          <div>
            <strong>Gender:</strong> {this.state.character.gender}
          </div>
          <div>
            <strong>Homeworld:</strong> {this.state.character.homeworld}
          </div>
          <div>
            <strong>Appears in:</strong> {this.state.characterFilm.title} (
            {this.state.characterFilm.release_date})
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// function characterData(props) {
//   const { name } = props
//   return (
//     <div>
//       <h4>{item.name}</h4>
//     </div>
//   );
// }
