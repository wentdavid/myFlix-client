import React from 'react';
import PropTypes from 'prop-types';
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            onMovieClick(movie);
          }}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};