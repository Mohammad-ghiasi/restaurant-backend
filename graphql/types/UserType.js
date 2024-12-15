const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    phonenumber: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  },
});

module.exports = UserType;
