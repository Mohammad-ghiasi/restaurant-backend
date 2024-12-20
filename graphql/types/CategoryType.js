const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const FoodModel = require("../../models/FoodModel");
const FoodType = require("./FoodType"); // Lazy import to avoid circular dependency

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    icon: { type: GraphQLString },
    foods: {
      type: new GraphQLList(FoodType),
      resolve: async (source) => {
        return await FoodModel.findAll({ where: { categoryId: source.id } });
      },
    },
  },
});

module.exports = CategoryType;
