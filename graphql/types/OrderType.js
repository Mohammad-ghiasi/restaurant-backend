const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");
const UserType = require("./UserType");
const FoodType = require("./FoodType");
const UserModel = require("../../models/UserModel");
const FoodModel = require("../../models/FoodModel");

const OrderType = new GraphQLObjectType({
  name: "OrderType",
  fields: {
    id: { type: GraphQLID },
    count: { type: GraphQLInt },
    userId: {
      type: UserType,
      resolve: async (source) => {
        return await UserModel.findOne({ where: { id: source.userId } });
      },
    },
    foodId: {
      type: FoodType,
      resolve: async (source) => {
        return await FoodModel.findOne({ where: { id: source.foodId } });
      },
    },
    isDeliver: { type: GraphQLBoolean },
  },
});

module.exports = OrderType;
