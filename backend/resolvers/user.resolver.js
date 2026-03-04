import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const userResolver = {
  Query: {
   authUser : async (_,args,context) => {
      try{
         const user = context.getUser();
         return user;
      }
      catch(error) {
         console.error("Error in authUser resolver:", error);
         throw new Error(error.message || "Internal Server Error");
      }
   },
   user :  async (_, userId) => {
      try {
         const user =  await User.findById(userId);
         return user;
      }
      catch(error) {
         console.error("Error in user resolver:", error);
         throw new Error(error.message || "Internal Server Error");
      }
   }
  },
  Mutation: {
   signUp :  async (_,{input},context) => {
      try{
         const {username,name,password,gender} = input;

         if(!username || !name || !password || !gender) {
            throw new Error("All fields are required.");
         }

         const existingUser = User.findOne({ username });

         if(existingUser) {
            throw new Error("Username already exists. Please choose a different one.");
         }

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);


         const boyProfilePic = `https://avatar.iran.liara.run/public/boy/${username}`;
         const girlProfilePic = `https://avatar.iran.liara.run/public/girl/${username}`;

         const newUser = new User({
            username,
            name,
            password: hashedPassword,
            gender,
            profilePicture : gender === "male" ? boyProfilePic : girlProfilePic
         });

         const savedUser = await newUser.save();
         await context.login(savedUser);
         return newUser;
      }
      catch(error){
         console.error("Error in signUp resolver:", error);
         throw new Error(error.message || "Internal Server Error" 
         );
      }
   },

   login : async (_,{input},context) => {
      try {
         const {username,password} = input;

         const {user} = await context.authenticate("graphql-local", { username , password });
         await context.login(user);
         return user 
      }
      catch(error) {
         console.error("Error in login resolver:", error);
         throw new Error(error.message || "Internal Server Error");
      }
   },

   logout : async (_,args,context) => {
      try {
         await context.logout();
         request.session.destroy((err) => {
            if (err) {
              console.error("Error destroying session:", err);
            }
          });
          res.clearCookie("connect.sid");

         return {message : "Logout successful"};
      }
      catch(error) {
         console.error("Error in logout resolver:", error);
         throw new Error(error.message || "Internal Server Error");
      }
   }
  },
};

export default userResolver;