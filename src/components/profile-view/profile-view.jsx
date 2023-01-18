import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MovieCard from "./MovieCard";

const ProfileView = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // Fetch data for the logged in user
  useEffect(() => {
    fetch("https://sheltered-crag-54265.herokuapp.com/users")
      .then((response) => response.json())
      .then((data) => {
        // Find the logged in user by filtering the list by username
        const loggedInUser = data.find((user) => user.Username === username);
        setUser(loggedInUser);
        setUsername(loggedInUser.Username);
        setPassword(loggedInUser.Password);
        setEmail(loggedInUser.Email);
        setBirthday(loggedInUser.Birthday);
      });
  }, []);

  // Filter the movies array by the logged in user's favorite movies
  let favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  // Handle input changes for the profile form
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://sheltered-crag-54265.herokuapp.com/users", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Profile update successful");
        window.location.reload();
      } else {
        alert("Profile update failed");
      }
    });
  };

  const handleDeregister = (event) => {
    // Prevent default behaviour
    event.preventDefault();

    // Send delete request to server
    fetch("https://sheltered-crag-54265.herokuapp.com/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: username,
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Deregistration successful");
        window.location.reload();
      } else {
        alert("Deregistration failed");
      }
    });
  };

  const handleRemoveMovie = (id) => {
    fetch("https://sheltered-crag-54265.herokuapp.com/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MovieId: id,
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Movie has been removed from favorites");
        window.location.reload();
      } else {
        alert("Unable to remove movie from favorites");
      }
    });
  };

  

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={handleBirthdayChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="danger" type="button" onClick={handleDeregister}>
          Deregister
        </Button>
      </Form>
      <div>
        <h3>Favorite Movies</h3>
        {favoriteMovies.map((m) => (
          <MovieCard key={m._id} movie={m}>
            <Button
              variant="primary"
              onClick={() => handleRemoveMovie(movie._id)}
            >
              Remove from favorites
            </Button>
          </MovieCard>
        ))}
      </div>
    </>
  );
};

export default ProfileView;

