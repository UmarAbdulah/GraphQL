import {users} from "../DummyData/data.js"


const userResolver = {
  Query: {
 users : () => { 
    return users;
 }
  },
  Mutation: {
  },
};

module.exports = userResolver;