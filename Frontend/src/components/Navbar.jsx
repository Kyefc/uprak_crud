import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useSelector((state) => state.auth);
const [isActive, setIsActive] = useState(false);

const logout = () => {
dispatch(LogOut());
dispatch(reset());
navigate("/");
};

const toggleBurger = () => {
setIsActive(!isActive);
};

return (
<nav className="navbar is-fixed-top has-shadow is-light" role="navigation" aria-label="main navigation" >
<div className="navbar-brand">
<NavLink to="/dashboard" className="navbar-item">
<img src={logo} width="112" height="28" alt="logo" />
</NavLink>

<a
      role="button"
      className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      onClick={toggleBurger}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div
    id="navbarBasicExample"
    className={`navbar-menu ${isActive ? "is-active" : ""}`}
  >
    <div className="navbar-end">
      {user && (
        <div className="navbar-item has-text-weight-semibold">
          Hello, {user.name}
        </div>
      )}
      {user && (
        <div className="navbar-item">
          <div className="buttons">
            <button onClick={logout} className="button is-light">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</nav>
);
}; 

export default Navbar;