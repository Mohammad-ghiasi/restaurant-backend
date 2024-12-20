const userResolvers = require("./resolvers/userResolver");
const orderResolvers = require("./resolvers/orderResolver");
const foodResolvers = require("./resolvers/foodResolver");
const categoryResolvers = require("./resolvers/categoryResolver");
const CategoryModel = require("../models/CategoryModel");
const FoodModel = require("../models/FoodModel");
const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");

const RootResolvers = {
  Query: {
    categories: categoryResolvers.categories,
    categorie: categoryResolvers.categorie,
    food: foodResolvers.food,
    foods: foodResolvers.foods,
    users: userResolvers.users,
    order: orderResolvers.order,
    orders: orderResolvers.orders,
  },

  Mutation: {
    addCategory: categoryResolvers.addCategory,
    addFood: foodResolvers.addFood,
    registerUser: userResolvers.registerUser,
    loginUser: userResolvers.loginUser,
    createOrder: orderResolvers.addOrder,
    deliverOrder: orderResolvers.deliverOrder,
    removeOrder: orderResolvers.deleteOrder,
  },

  FoodType: {
    category: async (parent) => {
      return await CategoryModel.findByPk(parent.categoryId);
    },
  },

  CategoryType: {
    foods: async (parent) => {
      return await FoodModel.findAll({ where: { categoryId: parent.id } });
    },
  },

  OrderType: {
    userId: async (parent) => {
      return await UserModel.findByPk(parent.userId);
    },
    foodId: async (parent) => {
      return await FoodModel.findByPk(parent.foodId);
    },
  },

  UserType: {
    orders: async (parent) => {
      return await OrderModel.findAll({ where: { userId: parent.id } });
    },
  },
};

module.exports = RootResolvers;
