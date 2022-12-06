import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      first
      last
      team
      phone
      email
      skills {
        _id
        title
        description
        skillType
      }
    }
  }
`;
export const QUERY_SKILLS = gql`
  query getSkills {
    skills {
      _id
      title
      description
      skillCreator
      skillType
    }
  }
`;

export const QUERY_SINGLE_SKILL = gql`
  query getSingleSkill($skillId: ID!) {
    skill(skillId: $skillId) {
      _id
      title
      description
      skillCreator
      skillType
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      first
      last
      team
      phone
      email
      skills {
        _id
        title
        description
        skillCreator
        skillType
      }
    }
  }
`;
