import React from "react";
import { Link } from "react-router-dom";

type Props = {};

function Home({}: Props) {
  return (
    <div>
      <Link to="/login">Login with Email/Password</Link>
      <br />
      <Link to="/register">Register User</Link>
      <br />
      <Link to="/create-profile">Create User Profile</Link>
      <br />
      <Link to="/view-profile">View User Profile</Link>
    </div>
  );
}

export default Home;
