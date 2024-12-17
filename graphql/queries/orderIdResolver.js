const { GraphQLNonNull, GraphQLID } = require("graphql");
const OrderType = require("../types/OrderType");
const OrderModel = require("../../models/OrderModel");

const orderIdResolver = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error("Order not Found!");
    }
    return order;
  },
};

module.exports = orderIdResolver;
