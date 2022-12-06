const { Schema, model } = require("mongoose");
const skillSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: "You need to leave a skill description!",
    minlength: 1,
    maxlength: 700,
    required: true,
    trim: true,
  },
  skillCreator: {
    type: String,
    required: true,
    trim: true,
  },
  skillType: {
    type: String,
    required: true,
    trim: true,
  },
});

const Skill = model("Skill", skillSchema);

module.exports = Skill;
