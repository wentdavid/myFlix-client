import { useState, useEffect, useMemo } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
        .then((data) => {
          console.log(data);
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