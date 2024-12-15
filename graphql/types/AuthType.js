const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const UserType = require("./UserType");

const AuthType = new GraphQLObjectType({
  name: "AuthType",
  fields: {
    token: { type: GraphQLString },
    user: { type: UserType },
  },
});

module.exports = AuthType;
