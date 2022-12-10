import React, { useState } from "react";
import { Form } from "react-router-dom";

const HomeSkillList = ({ users }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-dark">
      <h1 className="listhead">Resources</h1>
      <div className="form">
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search anything..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>Man</th>
              <th>Category</th>
              <th>Description</th>
              <th>Type</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          {users.map((user, index) => {
            return (
              <tbody key={index}>
                {user.skills.map((skill, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.last}</td>
                      <td>{skill.title}</td>
                      <td>{skill.description}</td>
                      <td>{skill.skillType}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default HomeSkillList;
