import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import SkillForm from "./skillForm";
import { QUERY_USER, QUERY_ME, QUERY_SKILLS } from "../utils/queries";
import SkillList from "./skillList";
import Auth from "../utils/auth";

const Email = () => {
  const { email: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });
  const user = data?.me || data?.user || {};
  let userEmail = "https://formsubmit.co/" + user.email;
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.email) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div class="container py-4">
        <h2>Email {user.last}</h2>
      <form action={userEmail} method="POST">
        <div class="mb-3">
          <label class="form-label" for="name">
            Name
          </label>
          <input
            class="form-control"
            id="name"
            type="text"
            placeholder="Name"
            data-sb-validations="required"
          />
        </div>

        <div class="mb-3">
          <label class="form-label" for="emailAddress">
            Email Address
          </label>
          <input
            class="form-control"
            id="emailAddress"
            type="email"
            placeholder="Email Address"
            data-sb-validations="required, email"
          />
        </div>

        <div class="mb-3">
          <label class="form-label" for="message">
            Message
          </label>
          <textarea
            class="form-control emailstyle"
            id="message"
            type="text"
            placeholder="Message"
            data-sb-validations="required"
          ></textarea>
        </div>

        <div class="d-grid">
          <button class="btn btn-primary btn-lg" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Email;
