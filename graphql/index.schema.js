const { buildSchema } = require("graphql");
const foodType = require("./types/CategoryType");
const orderType = require("./types/OrderType");
const userType = require("./types/UserType");

module.exports = buildSchema(`
    ${foodType.FoodType}
    ${foodType.CategoryType}
    ${orderType.OrderType}
    ${userType.UserType}
    ${userType.AuthType}

    type RootQuery {
        categorie(id: ID!): CategoryType
        categories: [CategoryType!]!
        foods: [FoodType]
        users: [UserType]
        orders: [OrderType]
        food(id: ID!): FoodType
        order(id: ID!): OrderType
    }
    type RootMutation {
        addCategory(title: String!, icon: String!): CategoryType
        addFood(name: String!, price: Int!, image: String!, categoryId: ID!, inventory: Int!): FoodType
        addOrder(count: Int!, userId: ID!, foodId: ID!): OrderType
        registerUser(username: String!, password: String!, phonenumber: String!): AuthType
        loginUser(userphonenumber: String!, password: String!): AuthType
        deliverOrder(id: ID!): OrderType
        deleteOrder(id: ID!): Boolean
    }
    schema {
        query: RootQuery
       
    }
`);

//  mutation: RootMutation