// get all categories
const { GraphQLList } = require("graphql");
const CategoryModel = require("../../models/CategoryModel");
const CategoryType = require("../types/CategoryType");

const categoriesRsolver = {
  type: new GraphQLList(CategoryType),
  resolve: async () => {
    return await CategoryModel.findAll();
  },
};

module.exports = categoriesRsolver;
