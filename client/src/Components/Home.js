import React from "react";
import Auth from "../utils/auth";
export default function Home() {
  return (
    <div>
    <div className="home ">
      <h1 className="display-1 display m-2">MDI Resource Page</h1>
      <span className="m-2 spantext">Mentor Discover Inspire</span>
      {Auth.loggedIn() ? (
          <></>
          ) : (
            <>
    <div>
      <a href="/Login" class="button2">Log In</a>
      <a href="/Signup" class="button2">Sign Up</a>
      </div>
      </>
        )}
    </div>
    
    </div>
  );
}
