import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import SkillForm from "./skillForm";
import { QUERY_USER, QUERY_ME, QUERY_SKILLS } from "../utils/queries";
import SkillList from "./skillList";
import Auth from "../utils/auth";

const Profile = () => {
  const { email: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });
  const user = data?.me || data?.user || {};
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
    <div className="container profilebody">
      <div className="main-body">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {user.last}'s' Profile
            </li>
          </ol>
        </nav>

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card cardfix">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://i.imgur.com/AwXM0Zi.jpg"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>
                      {user.first} {user.last}
                    </h4>
                    <a href="/Email"><button className="btn btn-outline-primary" >Email</button></a>
                  </div>
                </div>
              </div>
            </div>
          
          </div>
          <div className="col-md-8">
            <div className="card mb-3 cardfix" >
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.first} {user.last}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.email}</div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.phone}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Team</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.team}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-secondary "
                      target="__blank"
                      href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="">
                <div className="card ">
                  <div className="card-body">
                    <div className="">
                      <div className="mt-3 ">
                        <h4 className="headerskill">Skills</h4>

                        <SkillForm />
                        
                      </div>
                      <SkillList
                      skills={user.skills}
                      title={`${user.username}`}/>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
