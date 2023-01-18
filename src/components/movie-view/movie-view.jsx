import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Fetch data for the logged in user
  useEffect(() => {
    fetch("https://sheltered-crag-54265.herokuapp.com/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
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
      fetch("https://sheltered-crag-54265.herokuapp.com/users", {
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
      fetch("https://sheltered-crag-54265.herokuapp.com/users", {
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
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Genre Description: {movie.Genre.Description}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Card.Text>Bio: {movie.Director.Bio}</Card.Text>
        <Card.Text>Birth: {movie.Director.Birth}</Card.Text>
        <Card.Text>Death: {movie.Director.Death}</Card.Text>
        <Card.Text>Featured: {movie.Featured}</Card.Text>
        <Link to="/">
          <Button variant="primary" onClick={onBackClick}>
            Back
          </Button>
        </Link>
        <Button
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