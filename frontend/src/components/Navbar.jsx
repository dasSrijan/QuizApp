import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

export default function AppNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        {/* Left: Logo */}
        <Navbar.Brand as={Link} to="/">
          QuizApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Center: Menu */}
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/contest">Contest</Nav.Link>
            <Nav.Link as={Link} to="/history">History</Nav.Link>
          </Nav>

          {/* Right: Profile/Login */}
          <Nav>
            {user ? (
              <NavDropdown title={`${user.firstName} ${user.lastName}`} id="profile-dropdown">
                <NavDropdown.Item onClick={() => navigate("/profile")}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
