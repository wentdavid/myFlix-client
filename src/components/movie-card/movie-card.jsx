import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import { Card, Button } from "react-bootstrap";
import { MOVIE_API_URL } from "../../config";

export const MovieCard = ({ user, movie, onMovieClick }) => {
  console.log("Movie", movie);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorites = (event) => {
    event.preventDefault();
    if (isFavorited) {
      // If movie is already in favorites, remove it
      fetch(`${MOVIE_API_URL}/users/${user.Username}/movies/${movie._id}`, {
        method: "DELETE",
        body: JSON.stringify({
          Username: user.Username,
          FavoriteMovies: user.FavoriteMovies.filter(
            (m) => m._id !== movie._id
          ),
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
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
      fetch(`${MOVIE_API_URL}/users/${user.Username}/movies/${movie._id}`, {
        method: "POST",
        body: JSON.stringify({
          Username: user.Username,
          FavoriteMovies: [...user.FavoriteMovies, movie._id],
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
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
    <Card className="movie-card">
      <Card.Img
        className="movie-card-img"
        variant="top"
        src={movie.ImagePath}
      />
      <Card.Body className="movie-card-body">
        <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
        <Card.Text className="movie-card-text">{movie.Description}</Card.Text>
        <div className="center-button">
          <Link className="movie-card-link" to={`/movies/${movie._id}`}>
            <Button
              className="movie-card-button"
              variant="primary"
              onClick={() => {
                onMovieClick(movie);
              }}
            >
              View Details
            </Button>
          </Link>
          <Button
            className="movie-card-favorite-button"
            variant={isFavorited ? "danger" : "secondary"}
            onClick={handleFavorites}
          >
            {isFavorited ? "Favorited" : "+ Add to Favorites"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
