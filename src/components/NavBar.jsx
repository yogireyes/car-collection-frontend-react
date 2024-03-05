import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { AuthContext } from '../contexts/AuthContext'

function NavBar() {
  const { token,setToken } = useContext(AuthContext)
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    setToken(null)
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <FaCar/> Car-Collection
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              
              {!token && (
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
              )}
              {token && (<>
                <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  Home
                </Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to="/dashboard/create">
                  Create
                </Link>
              </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleLogOut}>
                    Logout
                  </a>
                </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
