import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import ConfirmModal from "../confirm-modal/confirm-modal";
import "./profile-view.scss";
import { MOVIE_API_URL } from "../../config";
import api from "../../api";
import helper from "../../helper";

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
  // Renish: Use getUser from api.js
  const getUser = async (username) => {
    const res = await api.getUser(username);
    if (res) {
      setUser(res);
      getUserFavoriteMovies(res.FavoriteMovies);
    }
  };

  const getUserFavoriteMovies = async (favoriteMovies) => {
    const res = await api.getAllMovies();
    if (res) {
      // Filter the movies to get only the movies that are favorited by the current user
      const userFavoriteMovies = res.filter((movie) =>
        favoriteMovies.includes(movie._id)
      );
      // Sort movies alphabetically
      userFavoriteMovies.sort((a, b) => (a.title > b.title ? 1 : -1));
      // Update the favoriteMovies state with the user's favorite movies
      setFavoriteMovies(userFavoriteMovies);
    }
  };

  /* Renish: Runs when the user clicks on Confirm */
  const handleModalConfirm = async () => {
    console.log("handleModalConfirm called", deleteClicked);
    const res = await api.verifyPassword(modalPassword);
    if (res) {
      deleteClicked ? deleteAccount() : updateAccount();
    }
  };

  /* Renish: Show modal, Try Delete Ac, Clean Up */
  const deleteAccount = async () => {
    const res = await api.deleteUser(username);
    console.log(res)
    if (res) {
      setShowModal(false);
      alert("User deleted successfully!");
      helper.clearAndForceLogout();
    }
  }

  /* Renish: Show modal, Try Update Ac, Clean Up */
  const updateAccount = async () => {
    const passwordInput = document.getElementById("formPassword");
    if (formPassword === "********" || formPassword === "") {
      setShowModal(false);
      alert("Please provide your old/new password");
      passwordInput.classList.add("form-control-focus");
      return;
    }
    const res = await api.updateUser({
      Username: username,
      Password: formPassword,
      Email: email,
      Birthday: birthday,
    });
    if (res) {
      passwordInput.classList.remove("form-control-focus");
      alert("User details updated successfully!");
      setUser(res);
      localStorage.setItem("user", JSON.stringify(res));
      setUpdateSuccess(true);
      setDisplayForm(false);
      setShowModal(false); // Hide the modal
      // helper.clearAndForceLogout(); You can also simply logout the user
    }
  }
  

  // Renish: TODO: We can also move this to api.js
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
                  setDeleteClicked(true);
                  setShowModal(true);
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
            <Form className="form-container" onSubmit={(e) => {
              e.preventDefault();
              setDeleteClicked(false);
              setShowModal(true)
              }}>
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
              {/* Renish: Converted modal into another component */}
              <ConfirmModal 
                show={showModal} 
                setShowModal={setShowModal} 
                modalPassword={modalPassword} 
                setModalPassword={setModalPassword}
                handleModalConfirm={handleModalConfirm}
              />

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
