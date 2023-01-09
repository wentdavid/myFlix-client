import { useState, useEffect, useMemo } from "react"; 
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { Row, Col } from "react-bootstrap";

import "./index.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const storedUser = JSON.parse(localStorage.getItem("user")); 
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
    <Row>
      <Col xs={12}>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorageclear();
        }}
      >
        Log out
      </button>
      </Col>

      {movies.map((movie) => (
        <Col xs={12} md={6} lg={4}>
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(movie);
          }}
        />
        </Col>
      ))}
      </Row>
  );
};
