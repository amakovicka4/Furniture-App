// src/components/Navbar.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../assests/images/logo1.png';
import { LoginContext } from '../context/LoginContext';




const NavbarComponent = () => {
  const [query, setQuery] = useState('');
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(LoginContext);



  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?search=${encodeURIComponent(query)}`);
    }
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container fluid className="px-0">
        {/* Logo - pushed to left */}
        <Navbar.Brand as={Link} to="/" className="me-auto">
          <img 
            src={logo} 
            alt="Furniture Shop Logo" 
            className="navbar-logo"
            style={{ 
              height: '100px',
              padding: '1px 10px',
              paddingLeft: '0'
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto"> 
            <Nav.Link 
              as="button" 
              className="text-dark border-0 bg-transparent"
              onClick={toggleSearch}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/shop-all"
              className={activeLink === "shop-all" ? "active navbar-link" : "navbar-link"}
              onClick={() => onUpdateActiveLink("shop-all")}
            >
              SHOP ALL
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/decor"
              className={activeLink === "decor" ? "active navbar-link" : "navbar-link"}
              onClick={() => onUpdateActiveLink("decor")}
            >
              DECOR
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/office"
              className={activeLink === "office" ? "active navbar-link" : "navbar-link"}
              onClick={() => onUpdateActiveLink("office")}
            >
              OFFICE
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/living-room"
              className={activeLink === "living-room" ? "active navbar-link" : "navbar-link"}
              onClick={() => onUpdateActiveLink("living-room")}
            >
              LIVING ROOM
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/bedroom"
              className={activeLink === "bedroom" ? "active navbar-link" : "navbar-link"}
              onClick={() => onUpdateActiveLink("bedroom")}
            >
              BEDROOM
            </Nav.Link>

            
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {isSearchVisible && (
              <div
                className="position-absolute top-0 start-0 w-100"
                style={{
                  backgroundColor: '#111',
                  height: '85px',
                  zIndex: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <form className="d-flex w-75 position-relative" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search..."
                    value={query}
                    autoFocus
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                      borderRadius: '4px',
                      paddingRight: '40px',
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-link text-white position-absolute end-0 top-50 translate-middle-y fs-3"
                    onClick={toggleSearch}
                    style={{ textDecoration: 'none' }}
                    aria-label="Close search"
                  >
                    &times;
                  </button>
                </form>
              </div>
            )}


            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/story">Our Story</Nav.Link>
            <Nav.Link as={Link} to={user ? "/" : "/login"} onClick={user ? logout : null}  >{user ? 'Logout' : 'Login'}</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;