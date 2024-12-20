const types = require("./types/AllTypes");

module.exports = `
    ${types.FoodType}
    ${types.AuthType}
    ${types.CategoryType}
    ${types.OrderType}
    ${types.UserType}


    type Query {
        categories: [CategoryType]
        categorie(id: ID!): CategoryType
        food(id: ID!): FoodType
        foods: [FoodType]
        users: [UserType]
        order(id: ID!): OrderType
        orders: [OrderType]
    }
   
    type Mutation {
        addCategory(title: String, icon: String): CategoryType
        addFood(name: String, price: Int, categoryId: ID, inventory: Int, image: String!): FoodType
        registerUser(username: String! ,phonenumber: String!, password: String!): AuthType
        loginUser(userphonenumber: String!, password: String!): AuthType
        createOrder(count: Int!, userId: ID!, foodId: ID!): OrderType
        deliverOrder(id: ID!): OrderType
        removeOrder(id: ID!): OrderType
    }
`;
