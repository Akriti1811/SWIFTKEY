import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import logo from "./images/tm_logo.jpg";

export default function Navbar(props) {
//   const { user } = useSelector((state) => ({ ...state }));

//   const history = useHistory();

//   const dispatch = useDispatch();
//   function logout() {
//     dispatch({
//       type: "LOGOUT",
//       payload: null,
//     });
//     window.localStorage.removeItem("auth");
//     history.push("/login");
//   }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand ml-5 " to="/">
            <img
              src={logo}
              alt=""
              width="50"
              height="50"
              className="logoimg d-inline-block align-text-top"
            />
            Typing  Master
          </Link>

          <ul className="nav  justify-content-end">
            <Link to="/login" className="anchors">
              <button type="button " className="btnlogin">
                Login
              </button>
            </Link>
            {/* {user && user.token && ( */}
              {/* <div class="dropdown">
                <button
                  class="profile_btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.user.name}
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-lg-end"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <Link to="/">
                    <li className="dropdown-item dropitem">Dashboard</li>
                  </Link>
                  <li className="dropdown-item dropitem" onClick={logout}>
                    LogOut
                  </li>
                </ul>
              </div> */}
            {/* )} */}
          </ul>
          
        </div>
      </nav>
    </>
  );
}
