import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import { MOVIE_API_URL } from "../../config";

export const ProfileView = () => {
  // Declare state variables for the form inputs, the token, and the displayForm state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formPassword, setFormPassword] = useState("********");
  // Declare state variables for the modal
  const [showModal, setShowModal] = useState(false);
  const [modalPassword, setModalPassword] = useState("");
  // Declare a state variable to store whether the "Delete Account" button has been clicked
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Use effect hook to retrieve the current user's information from localStorage
  useEffect(() => {
    if (user) {
      getUser(user.Username);
    }
  }, []); // The empty array ensures that this effect only runs on mount

  // set User data from server
  const setUser = (user) => {
    setUsername(user.Username);
    setPassword(user.Password);
    setEmail(user.Email);
    // Parse the birthday string and format it as yyyy-MM-dd
    const date = new Date(user.Birthday);
    setBirthday(date.toISOString().substring(0, 10));
  };

  // Fetch user from server
  const getUser = (username) => {
    fetch(`${MOVIE_API_URL}/users/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // If the request was successful
        setUser(response);

        getUserFavoriteMovies(response.FavoriteMovies);
      })
      .catch((error) => {
        alert("An error occurred while fetching your profile");
      });
  };

  const getUserFavoriteMovies = (favoriteMovies) => {
    fetch(`${MOVIE_API_URL}/movies`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => {
        console.log("UserFAvMOvies", data);
        // Map the movie data from the API to a new format
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
          };
        });
        // Filter the movies to get only the movies that are favorited by the current user
        const userFavoriteMovies = data.filter((movie) =>
          favoriteMovies.includes(movie._id)
        );
        // Sort movies alphabetically
        userFavoriteMovies.sort((a, b) => (a.title > b.title ? 1 : -1));
        // Update the favoriteMovies state with the user's favorite movies
        setFavoriteMovies(userFavoriteMovies);
      })
      .catch((error) => {
        // Display an alert if there is an error
        window.alert("An error occurred: " + error);
      });
  };

  // Event handler for when the form is submitted
  const handleSubmit = (event) => {
    console.log("handleSubmit called, deleteClicked:", deleteClicked);
    // Prevent the default refresh
    event.preventDefault();

    // Check if any of the form values have been changed from their default values or if the "Delete Account" button has been clicked
    if (
      username !== user.Username ||
      formPassword !== "********" ||
      email !== user.Email ||
      birthday !== user.Birthday ||
      deleteClicked
    ) {
      // If any of the form values have been changed or the "Delete Account" button has been clicked, show the modal to confirm the changes
      setShowModal(true);
    } else {
      // If none of the form values have been changed, show an alert
      alert("No changes have been made");
    }
  };
  // Event handler for when the "Confirm" button in the modal is clicked
  const handleModalConfirm = () => {
    // Send a request to the server to check if the entered password is correct
    fetch(`${MOVIE_API_URL}/verify-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username: user.Username,
        password: modalPassword,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        // If the "Delete Account" button has been clicked, send a DELETE request to delete the user's account
        if (deleteClicked) {
          fetch(
            `${MOVIE_API_URL}/users/${
              JSON.parse(localStorage.getItem("user")).Username
            }`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((response) => {
              // If the DELETE request was successful, log the user out and remove their information from localStorage
              setShowModal(false);
              alert("Your account has been deleted");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location = "/login";
            })
            .catch((error) => {
              console.error(error);
              alert("An error occurred while deleting your account");
            });
        } else {
          // If the "Delete Account" button has not been clicked, create an object with the form data
          let data;
          if (formPassword === "********") {
            alert("Please provide your old/new password");
            return;
          }

          // If the password has been updated, send the new password in the PUT request
          data = {
            Username: username,
            Password: formPassword,
            Email: email,
            Birthday: birthday,
          };

          // Send a PUT request to the server with the updated form data to update the users information
          fetch(`${MOVIE_API_URL}/users/${user.Username}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((response) => {
              // If the request was successful

              alert("Profile update successful");
              //update state
              setUser(response);
              //update localStorage
              localStorage.setItem("user", JSON.stringify(response));
              setUpdateSuccess(true);
              setDisplayForm(false);
              setShowModal(false); // Hide the modal
            })
            .catch((error) => {
              console.error(error);
              alert("An error occurred while updating your profile");
              setUpdateSuccess(false);
            });
        }
      })
      .catch((error) => {
        // There was an error in the request or the response was not 2xx
        console.error(error);
        alert(
          "An error occurred while verifying the password. Please try again."
        );
        setShowModal(false);
        return;
      });
  };

  const toggleFavorite = (movieId, isFavorite) => {
    // Send a DELETE request to the server if the movie is already marked as favorite, or a POST request if it is not yet marked as favorite
    const method = isFavorite ? "DELETE" : "POST";
    fetch(
      `${MOVIE_API_URL}/users/${
        JSON.parse(localStorage.getItem("user")).Username
      }/movies/${encodeURIComponent(movieId)}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setUser(response);
        getUserFavoriteMovies(response.FavoriteMovies);
        localStorage.setItem("user", JSON.stringify(response));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Render the form or the current user information
  return (
    <div>
      {/* Displaying a message if the update was successful */}
      {updateSuccess && (
        <Row className="update-success-message">
          <Col>
            <p>Profile information has been recently updated.</p>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          {/* Add a button that allows the user to toggle the form */}
          <div className="form-toggle-button-container">
            <Button
              className="form-toggle-button"
              onClick={() => setDisplayForm(!displayForm)}
            >
              {displayForm ? "Cancel" : "Edit Profile"}
            </Button>
            {/* Showing delete account button only when form is displayed */}
            {displayForm && (
              <Button
                className="form-delete-button"
                type="submit"
                variant="danger"
                onClick={(e) => {
                  console.log("Delete Account button clicked");
                  setDeleteClicked(true);
                  handleSubmit(e);
                }}
              >
                Delete Account
              </Button>
            )}
          </div>
        </Col>

        {/* Toggling the form based on the value of 'displayForm' */}
        {displayForm ? (
          <Col className="profile">
            <Form className="form-container" onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="form-group">
                <Form.Label className="form-label">Username:</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="form-group">
                <Form.Label className="form-label">Password:</Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  placeholder="Enter new password"
                  defaultValue="********"
                  onChange={(e) => setFormPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="form-group">
                <Form.Label className="form-label">Email:</Form.Label>
                <Form.Control
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBirthday" className="form-group">
                <Form.Label className="form-label">Birthday:</Form.Label>
                <Form.Control
                  className="form-control"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>

              {/* Showing a modal to confirm changes */}
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="form-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Enter your current password to confirm your changes:</p>
                  <Form.Control
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                    value={modalPassword}
                    onChange={(e) => setModalPassword(e.target.value)}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                    className="form-modal-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleModalConfirm}
                    className="form-modal-confirm"
                  >
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>

              <Button
                className="form-submit-button"
                variant="primary"
                type="submit"
              >
                Update Profile
              </Button>
            </Form>
          </Col>
        ) : (
          <>
            <Col className="user-info-container">
              {/* Display the current user information */}
              <p>
                <strong className="user-info-label">Username:</strong>{" "}
                <span className="user-info-value">{username}</span>
              </p>
              <p>
                <strong className="user-info-label">Password:</strong>{" "}
                <span className="user-info-value">********</span>
              </p>
              <p>
                <strong className="user-info-label">Email:</strong>{" "}
                <span className="user-info-value">{email}</span>
              </p>
              <p>
                <strong className="user-info-label">Birthday:</strong>{" "}
                <span className="user-info-value">{birthday}</span>
              </p>
            </Col>
            <div className="favorite-movies-container">
              <h2 className="favorite-movies-header">Favorite Movies</h2>
              <Row>
                {favoriteMovies.map((movie) => (
                  <Col key={movie.id}>
                    <MovieCard
                      movie={movie}
                      user={user}
                      isFavorite={true}
                      onMovieClick={() => {}}
                      toggleFavorite={(isFavorite) =>
                        toggleFavorite(movie._id, isFavorite)
                      }
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </Row>
    </div>
  );
};
