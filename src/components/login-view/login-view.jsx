import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MOVIE_API_URL } from "../../config";
import "./login-view.scss";


export const LoginView = ({ onLoggedIn, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

const handleSubmit = (event) => {
  event.preventDefault();

  axios
    .post(`${MOVIE_API_URL}/login`, {
      Username: username,
      Password: password,
    })
    .then((response) => {
      console.log("Login response: ", response);
      if (response.data.user) {
        onLoggedIn(response.data.user, response.data.token);
        notify("You are now logged in!", "success");
        history.push("/");
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      console.log("Login error: ", e);
      if (e.response && e.response.status !== 200) {
        notify("Error while logging in. Please try again.", "error");
      }
    });
};



  return (
    <div className="parent-container">
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

      <p className="welcome-message">Welcome to the Movie App</p>

      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group className="login-group">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
            required
          />
        </Form.Group>
        <Form.Group className="login-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="5"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="login-button">
          Login
        </Button>
      </Form>
    </div>
  );
};