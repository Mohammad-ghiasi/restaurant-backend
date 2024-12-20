const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require("graphql");
const CategoryType = require("./CategoryType"); // Lazy import to avoid circular dependency

const FoodType = new GraphQLObjectType({
  name: "FoodType",
  fields: () => {
    const CategoryType = require("./CategoryType"); // Lazy import to avoid circular dependency
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      price: { type: GraphQLInt },
      image: { type: GraphQLString },
      categoryId: {
        type: CategoryType,
        resolve: async (source) => {
          const CategoryModel = require("../../models/CategoryModel");
          return await CategoryModel.findByPk(source.categoryId);
        },
      },
      inventory: { type: GraphQLInt },
    };
  },
});

module.exports = FoodType;
