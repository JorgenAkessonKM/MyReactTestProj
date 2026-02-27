import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setName } from "../app/loggedInNameSlice";
import { useAuth } from "../contexts/AuthProvider";
import "./Navbar.css";

export default function Navbar() {
  const name = useSelector((state: any) => state.loggedInName.name);
  const dispatch = useDispatch();
  const auth = useAuth() as any;

  const handleLogout = async () => {
    await auth.logOut();
    dispatch(setName("Logged out!"));
  };

  const handleLogin = async () => {
    await auth.loginAction();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cards">
                Cards
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            
            {auth.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <p className="nav-link">
                    Welcome, {auth.user?.name || auth.user?.email || "User"}
                  </p>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-info"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    onClick={handleLogin}
                    className="btn btn-success"
                  >
                    Login with Okta
                  </button>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Signup
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
