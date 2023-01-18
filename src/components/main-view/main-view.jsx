import { useState, useEffect, useMemo } from "react"; 
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

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

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get("https://sheltered-crag-54265.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const filteredMovies = useMemo(() => {
    let filtered = [...movies];
    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.Genre.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.Director.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterQuery) {
      filtered = filtered.filter((movie) =>
        movie.Genre.Name.toLowerCase().includes(filterQuery.toLowerCase())
      );
    }
    return filtered;
  }, [movies, searchQuery, filterQuery]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md- ">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Title, Genre, Director"
        />
        <input
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter by Genre"
        />
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col key={movie._id} md={8}>
                        <MovieView movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
