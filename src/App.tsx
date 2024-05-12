import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUserProfile from "./pages/CreateUserProfile";
import ViewUserProfile from "./pages/ViewUserProfile";

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">mybobalist</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateUserProfile />} />
        <Route path="/view-profile" element={<ViewUserProfile />} />
      </Routes>
    </div>
  );
};

export default App;
