import http from "http";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// graphql schema defines the structure of the data that clients can query and operation they can perform
// this schema consists of 2 main parts 
// type defs 
// this defines tha shape of the data avaialable in the graphql api.they specify the type of the object and relation b/w them 
// resolvers
// resolvers are the functions that determine how to fetch the data asscoiated with each field in the schema 
dotenv.config();
const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
    typeDefs : mergedTypeDefs,
    resolvers : mergedResolvers,
    plugins : [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server,{
        context : async ({ req }) => ({ req })
    })
)

await new Promise((resolve) => httpServer.listen({ port : 4000 }, resolve));
console.log("Server is running on http://localhost:4000/");