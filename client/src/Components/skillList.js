import React, { useState } from "react";
import { REMOVE_SKILL } from "../utils/mutations";
import { QUERY_SKILLS, QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";

const SkillList = ({ skills, title, showTitle = true, showEmail = true }) => {
  const [skillId, setskillId] = useState("");
  const [removeSkill, { error }] = useMutation(REMOVE_SKILL, {
    update(cache, { data: { addSkill } }) {
      try {
        const { skills } = cache.readQuery({ query: QUERY_SKILLS });

        cache.writeQuery({
          query: QUERY_SKILLS,
          data: { skills: [removeSkill, ...skills] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, skills: [...me.skills, removeSkill] } },
      });
    },
  });

  const handleFormSubmit = async (event, skillId) => {
    event.preventDefault();

    try {
      const { data } = await removeSkill({
        variables: {
          skillId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "deleteSkill") {
      removeSkill(value);
    }
  };

  return (
    <div>
      <div>
        {skills &&
          skills.map((skill) => (
            <div key={skill._id} className="listheader">
              <div className="skills">{skill.title}</div>
              <div className="skills">{skill.description}</div>
              <form
                className=""
                onSubmit={(event) => handleFormSubmit(event, skill._id)}
              >
                <button
                  className="btn btn-primary listbtn"
                  name="skillId"
                  onChange={handleChange}
                  value={skill.id}
                >
                  Delete Activity
                </button>
              </form>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillList;
