import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = ()=>
  {
      localStorage.removeItem('token');
      navigate('/login');
  }
  // useEffect( ()=>
  // {
  // } , [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {!localStorage.getItem("token") ? (
                <>
                  <Link
                    type="button"
                    to="/login"
                    className="btn btn-light mx-1"
                  >
                    SignIn
                  </Link>
                  <Link
                    type="button"
                    to="/signup"
                    className="btn btn-light mx-1"
                  >
                    SignUp
                  </Link>
                </>
              ) : (
                <button className="btn btn-light" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
