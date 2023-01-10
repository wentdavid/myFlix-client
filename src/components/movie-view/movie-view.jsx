import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardImg,
  CardBody,
} from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Fetch data for the logged in user
  useEffect(() => {
    fetch("https://sheltered-crag-54265.herokuapp.com/users")
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
      <CardImg variant="top" src={movie.ImagePath} />
      <CardBody>
        <CardTitle>{movie.Title}</CardTitle>
        <CardText>{movie.Description}</CardText>
        <CardText>Genre: {movie.Genre.Name}</CardText>
        <CardText>Genre Description: {movie.Genre.Description}</CardText>
        <CardText>Director: {movie.Director.Name}</CardText>
        <CardText>Bio: {movie.Director.Bio}</CardText>
        <CardText>Birth: {movie.Director.Birth}</CardText>
        <CardText>Death: {movie.Director.Death}</CardText>
        <CardText>Featured: {movie.Featured}</CardText>
        <Link to="/">
          <Button variant="primary" onClick={onBackClick}>
            Back
          </Button>
        </Link>
        <Button
          variant={favorited ? "danger" : "primary"}
          onClick={handleFavorited}
        >
          {favorited ? "Remove from favorites" : "Add to favorites"}
        </Button>
      </CardBody>
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