import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
import PropTypes from "prop-types";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Call the onLoggedOut function to clear the user's token
    onLoggedOut();
  };


  return (
    <Navbar bg="#262626" className="navbar fixed-top" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img
            src={require("../../../img/Navbar/MovieApp_Logo_Navbar.png")}
            alt="logo"
          />
          Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile-view">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.string.isRequired,
  }),
  onLoggedOut: PropTypes.func.isRequired,
};