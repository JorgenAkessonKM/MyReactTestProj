import React from "react";
import { Link } from "react-router-dom";
import UserList from "../Components/userList";
import "./Home.css";

const Home: React.FC = () => (
  <div className="home-container">
    <h1>Home Page</h1>
    <UserList />

    <div style={{ marginTop: 20 }}>
      <Link to="/login">
        <button type="button">Get Started</button>
      </Link>
    </div>
  </div>
);

export default Home;
