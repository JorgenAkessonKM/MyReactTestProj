import React from "react";
import { Link } from "react-router-dom";
import UserList from "../Components/userList";

const Home: React.FC = () => (
  <div>
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
