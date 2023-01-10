import { useState, useEffect, useMemo } from "react"; 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main-view.scss";

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

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://sheltered-crag-54265.herokuapp.com/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!user ? (
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Log out
              </Button>
              {selectedMovie ? (
                <MovieView
                  movie={selectedMovie}
                  onBackClick={() => setSelectedMovie(null)}
                />
              ) : movies.length === 0 ? (
                <div>The list is empty!</div>
              ) : (
                <Row>
                  {movies.map((movie) => (
                    <Col xs={12} md={6} lg={4}>
                      <Card>
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(movie);
                          }}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Route>
        <Route path="*">
          <div>404 - Not Found</div>
        </Route>
      </Switch>
    </Router>
  );
};