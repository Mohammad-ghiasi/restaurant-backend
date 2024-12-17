const { GraphQLNonNull, GraphQLString } = require("graphql");
const UserModel = require("../../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthType = require("../../types/AuthType");

const loginUserResolverMutation = {
  type: AuthType,
  args: {
    userphonenumber: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    const { userphonenumber, password } = args;
    const userExist = await UserModel.findOne({
      where: { phonenumber: userphonenumber },
    });
    if (!userExist) {
      throw new Error("User not found");
    }
    const { username, phonenumber, role } = userExist;
    const comparePassword = await bcrypt.compare(password, userExist.password);
    if (!comparePassword) {
      throw new Error("incurect pasword");
    }

    const tokenPayload = {
      username,
      phonenumber,
      role,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "7d", // Token valid for 7 days
    });
    return {
      token,
      user: userExist,
    };
  },
};

module.exports = loginUserResolverMutation;
