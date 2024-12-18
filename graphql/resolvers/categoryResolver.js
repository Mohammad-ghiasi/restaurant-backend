const CategoryModel = require("../../models/CategoryModel");
const FoodModel = require("../../models/FoodModel");

module.exports = {
  categorie: async ({ id }) => {
    const categorie = await CategoryModel.findOne({ where: { id } });

    if (!categorie) {
      throw new Error("Category not found");
    }

    const foodsForThisCategorie = await FoodModel.findAll({
      where: { categoryId: id },
    });

    // اگر هیچ غذایی پیدا نشد، foods را به یک آرایه خالی تبدیل کن
    const foods = foodsForThisCategorie.length > 0 ? foodsForThisCategorie : [];

    return {
      ...categorie.toJSON(), // تبدیل به JSON برای دسترسی به همه فیلدها
      foods,
    };
  },

  categories: async () => {
    // دریافت همه دسته‌بندی‌ها
    const categories = await CategoryModel.findAll({ raw: true });

    // نگاشت غذاها به دسته‌بندی‌ها
    // Fetch foods for each category one by one
    const categoriesWithFoods = await Promise.all(
      categories.map(async (category) => {
        const foodForCategory = await FoodModel.findAll({
          where: { categoryId: category.id },
          raw: true,
        });
        return {
          ...category,
          foods: foodForCategory,
        };
      })
    );

    return categoriesWithFoods;
  },

  addCategory: async (args, req) => {
    const { role } = validateToken(req);
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
