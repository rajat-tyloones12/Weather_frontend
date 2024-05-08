import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Function to get the current URL path
  const getCurrentPath = () => {
    return window.location.pathname;
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Weather App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              {" "}
              <i
                className="fa-solid fa-bars fa-xl"
                style={{ color: "black", marginTop: "5px" }}
              ></i>{" "}
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-5">
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Your Profile
                </a>
              </li>
              {user ? (
                <>
                  {getCurrentPath() === "/" && ( // Check if the current path is the home page
                    <li className="nav-item">
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa fa-user"></i> Hi..{" "}
                          {user.data.name.split(" ")[0]} {/* Display only the first name */}
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="/profile">
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={logout}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
