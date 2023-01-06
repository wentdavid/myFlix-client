import { useState, useEffect, useMemo } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!user) {
    return (
      <LoginView 
       onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}
    />
   );
  }

    useEffect(() => {
      if (!token) {
        return;
      }

      fetch("https://gleansdb01.herokuapp.com/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((movies) => {
          setMovies(movies);
        });
    }, [token]);

 if (!user) {
   return <LoginView onLoggedIn={(user) => setUser(user)} />;
 }

  if (selectedMovie) {
    return ( 
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorageclear();
          }}
        >
          Log out
        </button>
        <MovieView 
        movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)}
        /> 
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorageclear();
          }}
        >
          Log out
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorageclear();
        }}
      >
        Log out
      </button>
      {movies.map((movie) => (
        <MovieCard 
        key={movie.id} 
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(movie);
         }}
        />
      ))}
    </div>
  );
};