const HomeSkillList = ({ skills }) => {
  if (!skills.length) {
    return <h3>No Activities Yet</h3>;
  }
  return (
    <div>
    <div>
      {skills &&
        skills.map((skill) => (
          <div key={skill._id} className="listheader">
            <div className="skills">{skill.title}</div>
            <div className="skills">{skill.description}</div>
            <div className="skills">{skill.skillCreator}</div>
          </div>
        ))}
    </div>
  </div>
  );
};

export default HomeSkillList;
