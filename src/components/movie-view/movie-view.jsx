import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardImg,
  CardBody,
} from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
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
        <Button variant="primary" onClick={onBackClick}>
          Back
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