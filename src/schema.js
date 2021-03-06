const { gql } = require("apollo-server");

const typeDefs = gql`
  """
  JWT of the user, with 2 and 10 days of duration
  """
  type Token {
    """
    JWT of an User with 2 hours of duration
    """
    token: String!
    """
    JWT of an User with 10 days of duration
    """
    refreshToken: String!
  }

  """
  Data necessary to Create or Update an user
  """
  input UserInput {
    """
    User name
    """
    name: String!
    """
    User email
    """
    email: String!
    """
    User password
    """
    password: String!
  }

  """
  Specific data of an User
  """
  type User {
    """
    Pk of an user, is generated by the DB
    """
    id: ID!
    """
    User name
    """
    name: String!
    """
    User email
    """
    email: String!
    """
    User password
    """
    password: String!
    """
    The list of beers that consumes an user
    """
    myBeers: [Beer]
  }

  """
  All data that belongs to an user
  """
  type SessionUser {
    """
    Specific data of an User
    """
    user: User!
    """
    JWTs of the user
    """
    tokens: Token!
  }

  """
  Data necessary to Create or Update a beer
  """
  input BeerInput {
    """
    Percentage of alcohol in the drink
    """
    percentage: Float!
    """
    Brand of the beer
    """
    brand: String!
    """
    Kind of the beer
    """
    kind: String!
    """
    Image of the beer
    """
    image: String!
  }

  """
  Specific data of a beer
  """
  type Beer {
    """
    Pk of a beer, is generated by the DB
    """
    id: ID!
    """
    Percentage of alcohol in the drink
    """
    percentage: Float!
    """
    Brand of the beer
    """
    brand: String!
    """
    Kind of the beer
    """
    kind: String!
    """
    Image of the beer
    """
    image: String!
    """
    Amount of beers consumed by an user
    """
    consumption: Int!
  }

  type Query {
    """
    Service to know in how environment we're running
    """
    environment: String!
    """
    Service that allows an user to log in
    """
    login(email: String!, password: String!): SessionUser!
    """
    Service to obtain all the information about the logged in user
    """
    me: User
    """
    Service to obtain all beers
    """
    beers: [Beer]!
    """
    Service to obtain all the information about a beer,
    if it is consulted by a registered user, it obtains the amount of beers it has consumed
    """
    beer(id: ID!): Beer
    """
    Service to obtain all beers of an specific kind,
    if it is consulted by a registered user, it obtains the amount of beers it has consumed
    """
    beersByKind(kind: String!): [Beer]!
  }

  type Mutation {
    """
    Service that allows us to register a user
    """
    register(user: UserInput!): SessionUser!
    """
    Service that allows us to create a new beer
    """
    createBeer(beer: BeerInput!): Beer!
    """
    Service that edits the amount a user has consumed a specific beer
    """
    beerConsumption(id: ID!, amount: Int!): Int!
  }
`;

module.exports = typeDefs;
