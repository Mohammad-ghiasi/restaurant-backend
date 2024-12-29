import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import cors from "cors";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const typeDefs = gql`
  scalar Upload

  type FileType {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [FileType]
  }

  type Mutation {
    singleUpload(file: Upload!): FileType
  }
`;

const resolvers = {
  Query: {
    uploads: async () => {
      // code for fetching uploaded files (if needed)
    },
  },
  Mutation: {
    singleUpload: async (parent, { file }, context) => {
      const { filename, mimetype, encoding, createReadStream } =
        await file.file;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      // Ensure the directory exists
      const uploadDir = path.join(__dirname, "public/images");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Define the full path for the file
      const filePath = path.join(uploadDir, filename);

      // Write the file to the disk
      const stream = createReadStream();
      const out = fs.createWriteStream(filePath);
      stream.pipe(out);

      await new Promise((resolve, reject) => {
        out.on("finish", resolve);
        out.on("error", reject);
      });

      return {
        filename,
        mimetype,
        encoding,
      };
    },
  },
};

const app = express();

app.use(cors());
app.use(graphqlUploadExpress());

const startServer = async () => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(3001, () => {
    console.log("server is running on => http://localhost:3001");
  });
};

startServer();