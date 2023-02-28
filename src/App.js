import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./components/search.svg";
import MovieCard from "./components/MovieCard";
import moon from "./components/moon.png"
import sun from "./components/sun.png"

const API_URL = "http://www.omdbapi.com?apikey=3dd2c310";

// const movie1 = {
//   Title: "Fighting, Flying and Driving: The Stunts of Spiderman 3",
//   Year: "2007",
//   imdbID: "tt1132238",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNTI3NDE1ZmEtMTRiMS00YTY4LTk0OGItNjY4YmI0MDM4OGM4XkEyXkFqcGdeQXVyODE2NDgwMzM@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  const [isDarkTheme, setisDarkTheme] = useState(true)

  const handleThemes = ()=>{
    const rootElement = document.getElementById('root');
    rootElement.classList.toggle('dark-theme')
    setisDarkTheme(!isDarkTheme)
  }

  // const checkbox = document.getElementById('checkbox');

  // checkbox.addEventListener('change', ()=>{
  //   document.body.classList.toggle('dark');
  // })

  return (
    <div className="app">
      <div className="header">
        <h1>Movies</h1>
        <div className="theme">
            <input type="checkbox" class="checkbox" id="checkbox" onClick={handleThemes}/>
          <label for="checkbox" class="label">
            <i><img className="fa-sun" src={sun} alt="img"/></i>
            <i><img className="fa-moon" src={moon} alt="img"/></i>
            <div class='ball'/>
          </label>
        </div>
      </div>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
