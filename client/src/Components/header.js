import React from "react";
import Auth from "../utils/auth";
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
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
  };
  return (
    <div class="hamburger-menu">
      <input id="menu__toggle" type="checkbox" style={styles.display} />
      <label class="menu__btn" for="menu__toggle">
        <span></span>
      </label>
      {Auth.loggedIn() ? (
          <>
<p className="hello"> Hello {user.first}!</p>
</>
        ) : (
          <>
             </>
        )}
      <ul class="menu__box">
        <li>
          <a class="menu__item" href="/">
            Home
          </a>
        </li>
        {Auth.loggedIn() ? (
          <>
            <li>
              <a onClick={logout} class="menu__item" href="#">
                Log Out
              </a>
            </li>
            <li>
              <a class="menu__item" href="#">
                Profile
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a class="menu__item" href="/Login">
                Login
              </a>
            </li>
            <li>
              <a class="menu__item" href="/Signup">
                Sign Up
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
