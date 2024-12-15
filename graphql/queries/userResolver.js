const { GraphQLList } = require("graphql");
const UserModel = require("../../models/UserModel");
const UserType = require("../types/UserType");

const userResolver = {
  type: new GraphQLList(UserType),
  resolve: async () => {
    return await UserModel.findAll();
  },
};

module.exports = userResolver;
