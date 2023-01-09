import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Genre Description: </span>
          <span>{movie.Genre.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Bio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div>
          <span>Birth: </span>
          <span>{movie.Director.Birth}</span>
        </div>
        <div>
          <span>Death: </span>
          <span>{movie.Director.Death}</span>
        </div>
        <div>
          <span>Featured: </span>
          <span>{movie.Featured}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
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