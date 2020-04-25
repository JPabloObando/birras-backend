const { gql } = require("apollo-server");

const typeDefs = gql`
  type Token {
    token: String!
    refreshToken: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type SessionUser {
    user: User!
    tokens: Token!
  }

  type Query {
    login(email: String!, password: String!): SessionUser
  }

  type Mutation {
    register(input: UserInput!): SessionUser
  }
`;

module.exports = typeDefs;
