const CategoryModel = require("../../models/CategoryModel");
const FoodModel = require("../../models/FoodModel");
const validateToken = require("../../utils/auth");

module.exports = {
  
  foods: async () => {
    return await FoodModel.findAll();
  }
,  

  food: async (_, { id }) => {
    const food = await FoodModel.findByPk(id);
    if (!food) {
      throw new Error("Food not found");
    }
    return food;
  },
  addFood: async (_, args, context) => {
    const { role } = validateToken(context.req);
    if (role !== "admin") {
      throw new Error("No access !");
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
