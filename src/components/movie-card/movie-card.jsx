import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./movie-card.scss";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  }

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
              //onMovieClick(movie);
            }}
          >
            View Details
          </Button>
        </Link>
        <Button
          className="movie-card-favorite-button"
          variant={isFavorited ? "danger" : "secondary"}
          onClick={handleFavoriteClick}
        >
          {isFavorited ? "Favovrited" : "+ Add to Favorites"}
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
  onMovieClick: PropTypes.func.isRequired
};