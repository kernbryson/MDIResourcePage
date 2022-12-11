import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries"
import HomeSkillList from "./Homeskilllist";
export default function Home() {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  
  return (
    <div>
            {Auth.loggedIn() ? (
          <></>
          ) : (
            <>
    <div className="home ">
      <h1 className="display-1 display m-2">Dog Soldiers Resource Page</h1>
      <span className="m-2 spantext">Mentor Discover Inspire</span>

    <div>
      <a href="/Login" class="button2">Log In</a>
      <a href="/Signup" class="button2">Sign Up</a>
      </div>
      </div>
      </>
        )}
  
    {Auth.loggedIn() ? (
        <>
    <HomeSkillList users={users}/>
    </>
 ) : (
  <div></div>
  )}
    </div>
  );
}
