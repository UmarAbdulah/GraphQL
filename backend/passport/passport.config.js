import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = () => {
    passport.serializeUser((user, done) => {
        console.log("Serializing user:", user);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing user with ID:", id);
        try {
            const user = await User.findById(id);
            console.log("Deserialized user:", user);
            done(null, user);
        } catch (error) {
            console.error("Error deserializing user:", error);
            done(error);
        }
    });

    passport.use(new GraphQLLocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error("Invalid username or password.");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid username or password.");}
            return done(null, user);
        } catch (error) {
            console.error("Error in LocalStrategy:", error);
            return done(error);
        }
    }));

};