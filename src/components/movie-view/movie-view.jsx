import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { MOVIE_API_URL } from "../../config";

import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);
 // const movie = movies.find((movie) => movie._id === movieId);//

  // Fetch data for the logged in user
  useEffect(() => {
    fetch(`${MOVIE_API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        // Find the logged in user by filtering the list by username
        const loggedInUser = data.find((user) => user.Username === username);
        setIsFavorited(loggedInUser.FavoriteMovies.includes(movie._id));
      });
  }, []);

  const handleFavorites = (event) => {
    event.preventDefault();
    if (isFavorited) {
      // If movie is already in favorites, remove it
      fetch(`${MOVIE_API_URL}/users/${username}/movies/${movie}`, {
        method: "PUT",
        body: JSON.stringify({
          Username: username,
          FavoriteMovies: user.FavoriteMovies.filter(
            (m) => m._id !== movie._id
          ),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setIsFavorited(false);
          alert("Movie removed from favorites");
        } else {
          alert("Failed to remove movie from favorites");
        }
      });
    } else {
      // If movie is not in favorites, add it
      fetch(`${MOVIE_API_URL}/users/${username}/movies/${movie}`, {
        method: "PUT",
        body: JSON.stringify({
          Username: username,
          FavoriteMovies: [...user.FavoriteMovies, movie._id],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setIsFavorited(true);
          alert("Movie added to favorites");
        } else {
          alert("Failed to add movie to favorites");
        }
      });
    }
  };

  return (
    <Card className="movie-view">
      <Card.Img
        className="movie-view-img"
        variant="top"
        src={movie.ImagePath}
      />
      <Card.Body className="movie-view-body">
        <Card.Title className="movie-view-title">{movie.Title}</Card.Title>
        <Card.Text className="movie-view-text">{movie.Description}</Card.Text>
        <Card.Text className="movie-view-text">
          Genre: {movie.Genre.Name}
        </Card.Text>
        <Card.Text className="movie-view-text">
          Genre Description: {movie.Genre.Description}
        </Card.Text>
        <Card.Text className="movie-view-text">
          Director: {movie.Director.Name}
        </Card.Text>
        <Card.Text className="movie-view-text">
          Bio: {movie.Director.Bio}
        </Card.Text>
        <Card.Text className="movie-view-text">
          Birth: {movie.Director.Birth}
        </Card.Text>
        <Card.Text className="movie-view-text">
          Death: {movie.Director.Death}
        </Card.Text>
        <Card.Text className="movie-view-text">
          Featured: {movie.Featured}
        </Card.Text>
        <Link to="/">
          <Button
            className="movie-view-button"
            variant="primary"
            onClick={onBackClick}
          >
            Back
          </Button>
        </Link>
        <Button
          className="movie-view-favorite-button"
          variant={isFavorited ? "danger" : "primary"}
          onClick={handleFavorites}
        >
          {isFavorited ? "Remove from favorites" : "Add to favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
      Description: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
      Bio: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
      Birth: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
      Death: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
