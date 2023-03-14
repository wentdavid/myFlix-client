import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "react-bootstrap";
import { MOVIE_API_URL } from "../../config";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [clickedMovie, setClickedMovie] = useState(null);

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
      .get(`${MOVIE_API_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const notify = (msg, type = "info") => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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
      <Row>
        <div className="search-filter-container">
          <input
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title, Genre, Director"
          />
          <input
            className="filter-input"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter by Genre"
          />
        </div>
        <div className="space-class"></div>

        <ToastContainer />

        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
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
                  <Col>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(user));
                      }}
                      notify={notify}
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
                    <Col>
                      {clickedMovie ? (
                        <MovieView user={user} movie={clickedMovie} />
                      ) : null}
                    </Col>
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView user={user} />
                  </Col>
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
                      <Col key={movie.id} className="Movie-Card">
                        <MovieCard
                          user={user}
                          movie={movie}
                          onMovieClick={() => setClickedMovie(movie)}
                        />
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
