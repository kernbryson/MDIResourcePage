import React from "react";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
const styles = {
  display: {
    display: "none",
  },
};
export default function Header() {
  const { first: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { first: userParam },
  });
  const user = data?.me || data?.user || {};

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location = "http://localhost:3000"
  };
  return (
    <div className="hamburger-menu">
      <input id="menu__toggle" type="checkbox" style={styles.display} />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>
      {Auth.loggedIn() ? (
        <>
          <p className="hello"> Hello {user.last}!</p>
        </>
      ) : (
        <></>
      )}
      <ul className="menu__box">
        <li>
          <a className="menu__item" href="/">
            Home
          </a>
        </li>
        {Auth.loggedIn() ? (
          <>
            <li>
              <a onClick={logout} className="menu__item" href="/">
                Log Out
              </a>
            </li>
            <li>
              <a className="menu__item" href="/Profile">
                Profile
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a className="menu__item" href="/Login">
                Login
              </a>
            </li>
            <li>
              <a className="menu__item" href="/Signup">
                Sign Up
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
