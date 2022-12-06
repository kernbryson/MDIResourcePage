import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_SKILL } from "../utils/mutations";
import { QUERY_SKILLS, QUERY_ME } from "../utils/queries";

const SkillForm = () => {
  const [skillForm, setSkillForm] = useState({
    title: "",
    description: "",
    skillType: "",
  });
  const [addSkill, { error }] = useMutation(ADD_SKILL, {
    update(cache, { data: { addSkill } }) {
      try {
        const { skills } = cache.readQuery({ query: QUERY_SKILLS });

        cache.writeQuery({
          query: QUERY_SKILLS,
          data: { skills: [addSkill, ...skills] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, skills: [...me.skills, addSkill] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSkill({
        variables: {
          title: skillForm.title,
          description: skillForm.description,
          skillType: skillForm.skillType
        },
      });
      setSkillForm({
        title: "",
        description: "",
        skillType: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const element = event.target;
    const temp = {};
    temp[element.name] = element.value;
    setSkillForm({ ...skillForm, ...temp });
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <p className={`m-0 ${error ? "text-danger" : ""}`}></p>
          <form className="addskill" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="form-control inputs"
              onChange={handleChange}
              name="title"
              value={skillForm.title}
            ></input>
            <input
              type="text"
              className="form-control inputs"
              placeholder="Description"
              onChange={handleChange}
              name="description"
              value={skillForm.description}
            ></input>
             <select
                        className="form-select inputs"
                        aria-label="Default select example"
                        name="skillType"
                        value={skillForm.skillType}
                        onChange={handleChange}
                      >
                        <option selected>Select skill type</option>
                        <option value="Paid">Paid</option>
                        <option value="Mentor">Mentor</option>
                      </select>
            <button className="btn btn-outline-primary skillbtn" type="submit">
              Add Skill
            </button>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3 alert">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SkillForm;
