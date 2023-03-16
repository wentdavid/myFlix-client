import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import api from "../../api";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

   /*  fetch(`${MOVIE_API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        setRedirect(true);
      } else {
        alert("Signup failed");
      }
    });
  };
 */


   const response = await api.signUpUser(data);

    if (response) {
      alert("Signup successful");
      setRedirect(true);
    } else {
      alert("Signup failed");
    }
  };

  if(redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="parent-signup-container">
      <img
        src={require("../../../img/Navbar/MovieApp_Logo_Animation_Top.png")}
        alt="movie logo"
        className="movie-logo-top"
      />

      <img
        src={require("../../../img/Navbar/MovieApp_Logo_Animation_Bottom.png")}
        alt="movie logo"
        className="movie-logo-bottom"
      />

      <p className="welcome-message">Get started at the Movie App</p>

      <Form onSubmit={handleSubmit} className="signup-form">
        <Form.Group controlId="formUsername" className="signup-group">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="signup-group">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="signup-group">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday" className="signup-group">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          className="signup-button"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
