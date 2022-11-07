import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from "./images/logo.png";

export default function Navbar(props) {
  const { auth } = useSelector((state) => ({ ...state }));

  let navigate = useNavigate();

  const dispatch = useDispatch();
  function logout() {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand ml-5 " to="/">
            <img
              src={logo}
              alt=""
              width="240"
              height="65"
              className="logoimg d-inline-block align-text-top"
            />
          </Link>

          <ul className="nav  justify-content-end">

            {auth === null && (
              <Link to="/login" className="anchors">
                <button type="button " className="btnlogin">
                  Login
                </button>
              </Link>
            )}

            {auth !== null && (
              <Link to="/dashboard" className="anchors">
                <button type="button " className="btnlogin">
                  Dashboard
                </button>
              </Link>
            )}

            {auth !== null && (
              <button type="button " className="btnlogin" onClick={logout}>
                Logout
              </button>
            )}

          </ul>
        </div>
      </nav>
    </>
  );
}
