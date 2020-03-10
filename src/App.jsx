import React, { Component } from "react";
import "./App.css";

const url = "https://swapi.co/api/people/20/";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      character: {},
      characterFilms: []
    };
  }

  getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        loading: false,
        character: data
      });
      const filmUrls = data.films;

      let films = [];
      for (const url of filmUrls) {
        const filmResponse = await fetch(url);
        const filmData = await filmResponse.json();
        films = [...films, filmData];
      }
      this.setState(prevState => {
        return {
          ...prevState,
          loading: false,
          characterFilms: films
        };
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
  }

  render() {
    // console.log("this.state", this.state);
    const films = this.state.characterFilms.map((film, index) => {
      return (
        <p key={index}>
          {film.title} ({film.release_date})
        </p>
      );
    });

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
            <strong>Appears in:</strong>
            {films}
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
