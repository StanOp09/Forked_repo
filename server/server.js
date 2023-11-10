require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const cors = require("cors");
const AWS = require("aws-sdk");
const monthlyReset = require("./utils/monthlyReset");

// AWS Config
AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_REGION,
});

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3002;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// CORS middleware
const whitelist = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:3001",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// console.log("TypeDefs:", JSON.stringify(typeDefs, null, 2));
// console.log("Resolvers:", JSON.stringify(resolvers, null, 2));

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  // app.use((req, res, next) => {
  //   console.log("Initial Headers:", req.headers);
  //   next();
  // });

  // app.use((req, res, next) => {
  //   console.log("All Incoming Headers:", req.headers);
  //   next();
  // });

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);

      // For manually testing cron job
      // resetUserArticleCounts()
      //   .then(() => {
      //     console.log("Reset function has been called and processed.");
      //   })
      //   .catch((error) => {
      //     console.error("Error occurred during reset:", error);
      //   });
    });
  });
};

// Call the async function to start the server
startApolloServer();
