exports.CategoryType = `
  type CategoryType {
  id: ID
  title: String
  icon: String
  foods: [FoodType]
  }
`;

exports.FoodType = `
type FoodType {
  id: ID
  name: String
  price: Int
  image: String
  categoryId: CategoryType
}
`;
