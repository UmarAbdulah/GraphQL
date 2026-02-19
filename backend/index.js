import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mergedResolvers from "./resolvers";

// graphql schema defines the structure of the data that clients can query and operation they can perform
// this schema consists of 2 main parts 
// type defs 
// this defines tha shape of the data avaialable in the graphql api.they specify the type of the object and relation b/w them 
// resolvers
// resolvers are the functions that determine how to fetch the data asscoiated with each field in the schema 
const server = new ApolloServer({
    typeDefs,
    resolvers : mergedResolvers
});

const {url} = await startStandaloneServer(server);
console.log(`Server is ready at ${url}`);
