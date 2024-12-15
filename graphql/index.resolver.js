const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const categoriesRsolver = require("./queries/categoryResolver");
const categoriesRsolverMutation = require("./mutations/categoryResolverMutation");
const foodResolver = require("./queries/foodResolver");
const foodResolverMutation = require("./mutations/foodResolverMutation");
const userResolver = require("./queries/userResolver");
const userRegisterResolverMutation = require("./mutations/userResolver/userRegisterResolver");
const loginUserResolverMutation = require("./mutations/userResolver/useLoginResolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    categries: categoriesRsolver,
    foods: foodResolver,
    users: userResolver,
  },
});
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addCategory: categoriesRsolverMutation,
    addFood: foodResolverMutation,
    registerUser: userRegisterResolverMutation,
    loginUser: loginUserResolverMutation,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
