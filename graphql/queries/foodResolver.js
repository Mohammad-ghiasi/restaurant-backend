const { GraphQLList } = require("graphql");
const FoodType = require("../types/FoodType");
const FoodModel = require("../../models/FoodModel");

const foodResolver = {
  type: new GraphQLList(FoodType),
  resolve: async () => {
    return await FoodModel.findAll();
  },
};

module.exports = foodResolver;