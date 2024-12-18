const CategoryModel = require("../../models/CategoryModel");
const FoodModel = require("../../models/FoodModel");
const validateToken = require("../../utils/auth");

module.exports = {
  
  foods: async () => {
    const foods = await FoodModel.findAll();
  
    const foodsWithCategorie = await Promise.all(
      foods.map(async (food) => {
        const category = await CategoryModel.findByPk(food.categoryId);

        return {
          ...food.toJSON(), // تبدیل food به JSON
          categoryId: category, // افزودن اطلاعات مربوط به دسته‌بندی
        };
      })
    );
  
    return foodsWithCategorie;
  }
,  

  food: async ({ id }) => {
    const food = await FoodModel.findByPk(id);
    if (!food) {
      throw new Error("Food not found");
    }
    return food;
  },
  addFood: async (args, req) => {
    const { role } = validateToken(req);
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
