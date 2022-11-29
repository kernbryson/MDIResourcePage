import React from "react";

export default function Home() {
  return (
    <div>
    <div className="home ">
      <h1 className="display-1 display m-2">MDI Resource Page</h1>
      <span className="m-2 spantext">Mentor Discover Inspire</span>
      <form action="/Login">
      <button   className="btn btn-secondary  display m-2 loginbtn">
        Log In or Sign Up
      </button>
      </form>
    </div>
    <div>
      About Us
    </div>
    </div>
  );
}
