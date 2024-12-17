const { GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLNonNull } = require("graphql");
const OrderType = require("../types/OrderType");
const OrderModel = require("../../models/OrderModel");

const orderResolverMutation = {
  type: OrderType,
  args: {
    count: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    foodId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args) => {
    const { count, userId, foodId } = args;
    const newOrder = {
      count,
      userId,
      foodId,
    };
    // return await OrderModel.create(newOrder);
    return await OrderModel.create(newOrder);
  },
};

module.exports = orderResolverMutation;
