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
    myBeers: [Beer]
  }

  type SessionUser {
    user: User!
    tokens: Token!
  }

  input BeerInput {
    percentage: Float!
    brand: String!
    kind: String!
    image: String!
  }

  type Beer {
    id: ID!
    percentage: Float!
    brand: String!
    kind: String!
    image: String!
    consumption: Int!
  }

  type Query {
    login(email: String!, password: String!): SessionUser!
    me: User
    beers: [Beer]!
    beer(id: ID!): Beer!
  }

  type Mutation {
    register(user: UserInput!): SessionUser!
    createBeer(beer: BeerInput!): Beer!
    beerConsumption(id: ID!, amount: Int!): Int!
  }
`;

module.exports = typeDefs;
