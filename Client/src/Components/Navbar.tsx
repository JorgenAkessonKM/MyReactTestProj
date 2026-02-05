import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setName } from "../app/loggedInNameSlice";
import { useAuth } from "../contexts/AuthProvider";

export default function Navbar() {
  const name = useSelector((state: any) => state.loggedInName.name);
  const dispatch = useDispatch();
  const auth = useAuth() as any;

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
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                Signup
              </a>
            </li>
            <li className="nav-item">
              <p className="nav-link">{name}</p>
            </li>
            <li className="nav-item">
              <button
                style={{ display: "flex", justifyContent: "flex-end" }}
                onClick={() => {
                  auth.logOut();
                  dispatch(setName("Logged out!"));
                }}
                className="btn btn-info"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
