const { GraphQLList } = require("graphql");
const OrderType = require("../types/OrderType");
const OrderModel = require("../../models/OrderModel");

const orderResolver = {
  type: new GraphQLList(OrderType),
  resolve: async () => {
    return await OrderModel.findAll();
  },
};

module.exports = orderResolver;
