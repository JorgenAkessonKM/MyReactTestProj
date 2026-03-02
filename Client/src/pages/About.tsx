import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import "./About.css";

function About() {
  const auth = useAuth();
  return (
    <>
      <div className="about-container">
        <h1>About Page</h1>
        {auth.isAuthenticated ? (
          <>
            <p>{auth.user?.name}</p>
            <p>{auth.user?.email}</p>
            <p>{auth.user?.locale}</p>
            <p>{auth.user?.zoneinfo}</p>
          </>
        ) : (
          <></>
        )}
        <p>This is the About Page.</p>
      </div>
    </>
  );
}

export default About;
