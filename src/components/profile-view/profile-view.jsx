import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    fetch("https://sheltered-crag-54265.herokuapp.com/", {
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

  return (
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
    </Form>
  );
};

export default ProfileView;

