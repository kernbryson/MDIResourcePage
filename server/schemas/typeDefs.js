const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    first: String
    last:String
    team:String
    phone:String
    email: String
    password: String
    skills: [Skill]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Skill {
    _id: ID
    title: String
    description: String
    skillCreator: String
  }

  type Query {
    users: [User]
    user(email: String!): User
    skills(email: String): [Skill]
    skill(skillId: ID!): Skill
    me: User
  }

  type Mutation {
    addUser(first: String!, last: String!, team: String!, phone: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSkill(
      title: String!
      description: String!
    ): Skill
    removeSkill(skillId: ID!): Skill
  }
`;

module.exports = typeDefs;
