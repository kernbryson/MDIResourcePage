import React, { useState } from "react";
import { Form } from "react-router-dom";

const HomeSkillList = ({ users }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-dark areacountainer">
      <h1 className="listhead"> Dog Soldiers Resources</h1>
      <div className="form">
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search anything..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <table className="table table-bordered table-dark table-hover tablestyle">
          <thead>
            <tr>
              <th>Man</th>
              <th>Category</th>
              <th>Description</th>
              <th>Type</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Team</th>
            </tr>
          </thead>
          {users.map((user, index) => {
            return (
              <tbody key={index}>
                {user.skills
                  .filter((skill) => {
                    return search.toLowerCase() === ""
                      ? skill || user
                      : skill.title.toLowerCase().includes(search) ||
                          skill.description.toLowerCase().includes(search) ||
                          skill.skillType.toLowerCase().includes(search) ||
                          user.last.toLowerCase().includes(search) ||
                          user.email.toLowerCase().includes(search) ||
                          user.phone.toLowerCase().includes(search) ||
                          user.team.toLowerCase().includes(search);
                  })
                  .map((skill, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.last}</td>
                        <td>{skill.title}</td>
                        <td>{skill.description}</td>
                        <td>{skill.skillType}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.team}</td>
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
