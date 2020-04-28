import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/schema";
import resolvers from "./src/resolvers";
import fs from "fs";
import https from "https";
import http from "http";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const app = express();
apollo.applyMiddleware({ app });

server = https.createServer(
  {
    key: fs.readFileSync(`./ssl/server.key`),
    cert: fs.readFileSync(`./ssl/server.crt`),
  },
  app
);

server.listen({ port: process.env.PORT || 3000 }, () =>
  console.log("🚀 Server ready at")
);
