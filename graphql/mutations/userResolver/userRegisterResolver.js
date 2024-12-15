const { GraphQLNonNull, GraphQLString } = require("graphql");
const AuthType = require("../../types/AuthType");
const UserModel = require("../../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegisterResolverMutation = {
  type: AuthType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    phonenumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    const { username, password, phonenumber } = args;

    // Determine user role
    const isAdmin =
      phonenumber === "09187012481" || phonenumber === "09183378522"
        ? "admin"
        : "user";

    // Check if user already exists
    const userExist = await UserModel.findOne({ where: { username } });
    if (userExist) {
      throw new Error("User already exists!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = {
      username,
      phonenumber,
      password: hashedPassword,
      role: isAdmin,
    };

    // Save user to database
    const createUser = await UserModel.create(newUser);

    // Generate token
    const tokenPayload = {
      username,
      phonenumber,
      role: isAdmin,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Return response
    return {
      token,
      user: createUser,
    };
  },
};

module.exports = userRegisterResolverMutation;
