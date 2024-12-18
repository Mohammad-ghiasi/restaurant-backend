// const { GraphQLObjectType, GraphQLSchema } = require("graphql");
// const categoriesRsolver = require("./queries/categoryResolver");
// const categoriesRsolverMutation = require("./mutations/categoryResolverMutation");
// const foodResolver = require("./queries/foodResolver");
// const foodResolverMutation = require("./mutations/foodResolverMutation");
// const userResolver = require("./queries/userResolver");
// const userRegisterResolverMutation = require("./mutations/auth/userRegisterResolver");
// const loginUserResolverMutation = require("./mutations/auth/useLoginResolver");
// const orderResolverMutation = require("./mutations/orderResolverMutation");
// const orderResolver = require("./queries/orderResolver");
// const orderDeliveMutation = require("./mutations/deliverOrderMutation");
// const deleteOrderMutation = require("./mutations/DeleteOrderMutation");
// const foodIdResolver = require("./queries/foodIdResolver");
// const orderIdResolver = require("./queries/orderIdResolver");

// const RootQuery = new GraphQLObjectType({
//   name: "RootQuery",
//   fields: {
//     categries: categoriesRsolver,
//     foods: foodResolver,
//     users: userResolver,
//     orders: orderResolver,
//     food: foodIdResolver,
//     order: orderIdResolver,
//   },
// });
// const RootMutation = new GraphQLObjectType({
//   name: "RootMutation",
//   fields: {
//     addCategory: categoriesRsolverMutation,
//     addFood: foodResolverMutation,
//     addOrder: orderResolverMutation,
//     registerUser: userRegisterResolverMutation,
//     loginUser: loginUserResolverMutation,
//     deliverOrder: orderDeliveMutation,
//     deleteOrder: deleteOrderMutation,
//   },
// });

// // ******* Create Response Type For All Response Status *******

// const schema = new GraphQLSchema({
//   query: RootQuery,
//   mutation: RootMutation,
// });

// module.exports = schema;
