require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const fs = require("fs");
const https = require("https");
const http = require("http");
const app = express();
const db = require("./src/db");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const { auth } = require("./src/utils");
const port = process.env.PORT || 4000;
const environment = process.env.NODE_ENV || "development";

const configurations = {
  production: {
    ssl: true,
    port,
    url: "https://birras-backend.herokuapp.com/graphql",
  },
  development: {
    ssl: false,
    port,
    url: `http://localhost:${port}/graphql`,
  },
};
const config = configurations[environment];

/**
 * @func context
 * @desc Share across all resolvers a potential user and an initialization of our db
 */
const context = async ({ req, res }) => {
  const user = await auth(req, res);
  return { user, db };
};

/**
 * @func start
 * @desc Create an instance of ApolloServer and then will launch a web server
 */
const start = () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true,
  });

  app.use(bodyParser.json({ limit: "100mb" }));
  apollo.applyMiddleware({ app, path: "/" });

  let server = null;
  if (config.ssl) {
    server = https.createServer(
      {
        key: fs.readFileSync(`./ssl/server.key`),
        cert: fs.readFileSync(`./ssl/server.crt`),
      },
      app
    );
  } else {
    server = http.createServer(app);
  }

  server.listen({ port: port }, () =>
    console.log(`🚀 Server ready at ${config.url}`)
  );
};

start();
