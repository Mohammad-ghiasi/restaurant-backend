// create a new category
const CategoryType = require("../types/CategoryType");
const CategoryModel = require("../../models/CategoryModel");
const { GraphQLNonNull, GraphQLString } = require("graphql");
const validateToken = require("../../utils/auth");

const categoriesRsolverMutation = {
  type: CategoryType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, context) => {
    const { role } = validateToken(context.req);
    if (role !== 'admin') {
      throw new Error("No access !")
    }
    const { title, icon } = args;
    // check for exsisting category.
    const categoryExist = await CategoryModel.findOne({
      where: { title },
    });
    if (categoryExist) {
      console.log("This category alrediexist!");
      throw new Error("This category alrediexist!");
    }

    const newcategory = {
      title,
      icon,
    };
    return await CategoryModel.create(newcategory);
  },
};

module.exports = categoriesRsolverMutation;
