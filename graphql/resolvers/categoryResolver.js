const CategoryModel = require("../../models/CategoryModel");
const FoodModel = require("../../models/FoodModel");
const validateToken = require("../../utils/auth");

module.exports = {
  categorie: async (_, { id }) => {
    return await CategoryModel.findByPk(id)
  },

  categories: async () => {
    return await CategoryModel.findAll()
  },

  addCategory: async (_ , args, context) => {
    const { role } = await validateToken(context.req);    
    if (role !== "admin") {
      throw new Error("No access !");
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
