import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $first: String!
    $last: String!
    $team: String!
    $phone: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      first: $first
      last: $last
      team: $team
      phone: $phone
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;