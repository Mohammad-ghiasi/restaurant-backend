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
    category: CategoryType
    inventory: Int
  }
`;

exports.OrderType = `
  type OrderType {
    userId: UserType
    foodId: FoodType
    count: Int
    isDeliver: Boolean
  }
`;

exports.UserType = `
  type UserType {
    id: ID
    username: String
    phonenumber: String
    password: String
    role: String
    orders: [OrderType]
  }
`;

exports.AuthType = `
  type AuthType {
    token: String
    user: UserType
  }
`;
