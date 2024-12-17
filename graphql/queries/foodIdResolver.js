const { GraphQLNonNull, GraphQLID } = require("graphql");
const FoodType = require("../types/FoodType");
const FoodModel = require("../../models/FoodModel");

const foodIdResolver = {
  type: FoodType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    const food = await FoodModel.findByPk(id);
    if (!food) {
      throw new Error("Food not found");
    }
    return food;
  },
};

module.exports = foodIdResolver;
