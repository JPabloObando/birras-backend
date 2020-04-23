const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    test: String
  }
`;

module.exports = typeDefs;
