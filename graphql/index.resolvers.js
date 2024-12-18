const userResolvers = require("./resolvers/userResolver");
const orderResolver = require("./resolvers/orderResolver");
const foodResolver = require("./resolvers/foodResolver");
const categoryResolver = require("./resolvers/categoryResolver");

const RootResolvers = {
  ...userResolvers,
  ...orderResolver,
  ...foodResolver,
  ...categoryResolver,
};

module.exports = RootResolvers;
