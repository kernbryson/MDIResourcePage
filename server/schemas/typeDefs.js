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
 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
  }

  type Mutation {
    addUser(first: String!, last: String!, team: String!, phone: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
