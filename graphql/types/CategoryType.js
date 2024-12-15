const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const FoodModel = require("../../models/FoodModel");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => {
    const FoodType = require("./FoodType"); // Lazy import to avoid circular dependency
    return {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      icon: { type: GraphQLString },
      foods: {
        type: new GraphQLList(FoodType),
        resolve: async (source) => {
          return await FoodModel.findAll({ where: { categoryId: source.id } });
        },
      },
    };
  },
});

module.exports =  CategoryType ;
