const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// In-memory data storage
const newsList = [];
const pubsub = new PubSub();
const NEWS_ADDED = "NEWS_ADDED";

// GraphQL Schema
const typeDefs = `
  type News {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    news: [News!]
  }

  type Mutation {
    addNews(title: String!, description: String!): News!
  }

  type Subscription {
    newsAdded: News!
  }
`;

const resolvers = {
  Query: {
    news: () => newsList,
  },
  Mutation: {
    addNews: (_, { title, description }) => {
      const news = { id: newsList.length + 1, title, description };
      newsList.push(news);

      // Publish the added news to subscribers
      pubsub.publish(NEWS_ADDED, { newsAdded: news });

      return news;
    },
  },
  Subscription: {
    newsAdded: {
      subscribe: () => pubsub.asyncIterator([NEWS_ADDED]),
    },
  },
};

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Express app setup
const app = express();

// Start Apollo Server
async function startApolloServer() {
  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  // Create HTTP and WebSocket servers
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

  // Pass the schema to useServer
  useServer({ schema }, wsServer);

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
