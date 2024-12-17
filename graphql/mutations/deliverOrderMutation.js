const { GraphQLNonNull, GraphQLID } = require("graphql");
const OrderType = require("../types/OrderType");
const OrderModel = require("../../models/OrderModel");
const validateToken = require("../../utils/auth");

const orderDeliveMutation = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }, context) => {
    const { role } = validateToken(context.req);
    if (role !== 'admin') {
      throw new Error("No access !")
    }
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error("Order not found!");
    }
    return await order.update({ isDeliver: true });

  },
};

module.exports = orderDeliveMutation;
