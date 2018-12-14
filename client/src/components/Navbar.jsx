import React from "react";
import { Link } from "react-router-dom";
import AuthButton from "./auth/authButton";

const NavigationBar = () => {
  return (
    <div className="navbar bg-info">
      <h1 className="text-white">Chriper App</h1>
      <div>
        <AuthButton />
        <Link to="/donate" className="btn btn-warning">
          Donate
        </Link>
        <Link to="/contact" className="btn btn-dark">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
