const OrderModel = require("../../models/OrderModel");
const validateToken = require("../../utils/auth");

module.exports = {
  orders: async () => {
    return await OrderModel.findAll();
  },
  order: async ({ id }) => {
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error("Order not Found!");
    }
    return order;
  },
  addOrder: async (_, args) => {
    const { count, userId, foodId } = args;
    const newOrder = {
      count,
      userId,
      foodId,
    };
    // return await OrderModel.create(newOrder);
    return await OrderModel.create(newOrder);
  },
  deliverOrder: async ({ id }, req) => {
    const { role } = validateToken(req);
    if (role !== "admin") {
      throw new Error("No access !");
    }
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error("Order not found!");
    }
    return await order.update({ isDeliver: true });
  },
  deleteOrder: async ({ id }, req) => {
    const { role } = validateToken(req);
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
