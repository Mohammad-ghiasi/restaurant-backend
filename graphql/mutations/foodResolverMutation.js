const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require("graphql");
const FoodType = require("../types/FoodType");
const FoodModel = require("../../models/FoodModel");
const validateToken = require("../../utils/auth");

const foodResolverMutation = {
  type: FoodType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    categoryId: { type: new GraphQLNonNull(GraphQLID) },
    inventory: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_, args, context) => {
    const { role } = validateToken(context.req);
    if (role !== 'admin') {
      throw new Error("No access !")
    }
    const { name, price, image, categoryId, inventory } = args;
    const foodExist = await FoodModel.findOne({ where: { name } });
    if (foodExist) {
      console.log("This food alrediexist!");
      throw new Error("This food alrediexist!");
    }
    const newFood = {
      name,
      price,
      image,
      categoryId,
      inventory,
    };
    return await FoodModel.create(newFood);
  },
};

module.exports = foodResolverMutation;
