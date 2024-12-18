exports.OrderType = `
  type OrderType {
    id: ID
    count: Int
    userId: UserType
    foodId: FoodType
    isDeliver: Boolean
  }
`;
