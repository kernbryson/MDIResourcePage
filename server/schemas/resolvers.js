const { AuthenticationError } = require("apollo-server-express");
const { User, Skill } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("skills");
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate("skills");
    },
    skills: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Skill.find(params);
    },
    skill: async (parent, { skillId }) => {
      console.log(Skill.findOne({ _id: skillId }));
      return Skill.findOne({ _id: skillId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("skills");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { first, last, team, phone, email, password }) => {
      const user = await User.create({ first, last, team, phone, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addSkill: async (
      parent,
      { title, description, skillType },
      context
    ) => {
      if (context.user) {
        const skill = await Skill.create({
         title,
         description,
         skillCreator: context.user.email,
         skillType
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { skills: skill._id } }
        );

        return skill;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeSkill: async (parent, { skillId }, context) => {
      if (context.user) {
        const skill = await Skill.findOneAndDelete({
          _id: skillId,
          skillCreator: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { skills: skill._id } }
        );

        return skill;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

  },
};

module.exports = resolvers;
