import React, { useState } from "react";
import { Form } from "react-router-dom";

const HomeSkillList = ({ skills }) => {
  const [search, setSearch] = useState("");
  console.log(search);
  if (!skills.length) {
    return <h3>No Activities Yet</h3>;
  }
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
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          {skills &&
            skills
              .filter((skill) => {
                return search.toLowerCase() === ""
                  ? skill
                  : skill.title.toLowerCase().includes(search) ||
                      skill.skillCreator.toLowerCase().includes(search) ||
                      skill.description.toLowerCase().includes(search) ||
                      skill.skillType.toLowerCase().includes(search);
              })
              .map((skill) => (
                <tbody key={skill._id}>
                  <tr>
                    <td>{skill.skillCreator}</td>
                    <td>{skill.title}</td>
                    <td>{skill.description}</td>
                    <td>{skill.skillType}</td>
                  </tr>
                </tbody>
              ))}
        </table>
      </div>
    </div>
  );
};

export default HomeSkillList;
