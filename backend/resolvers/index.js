import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import transcationResolver from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, transcationResolver]);

export default mergedResolvers;