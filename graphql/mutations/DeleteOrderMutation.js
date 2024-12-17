const { GraphQLID, GraphQLNonNull, GraphQLBoolean } = require("graphql");
const OrderType = require("../types/OrderType");
const validateToken = require("../../utils/auth");
const OrderModel = require("../../models/OrderModel");

const deleteOrderMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }, context) => {
    const { role } = validateToken(context.req);
    if (role !== "admin") {
      throw new Error("No access !");
    }
    const result = await OrderModel.destroy({
      where: { id },
    });

    if (!result) {
      throw new Error("Order not found!");
    }

    return true;
  },
};

module.exports = deleteOrderMutation;
