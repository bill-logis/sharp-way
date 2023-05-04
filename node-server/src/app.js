const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017/sharpway';

let tasks = [
  {
    id: 1,
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress',
  },
];

const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
  }
  type Query {
    tasks: [Task!]!
  }
  type Mutation {
    newTask(
        title: String!
        description: String!
    ): Task!
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    newTask: (parent, args) => {
      let taskValue = {
        id: String(tasks.length + 1),
        title: args.title,
        description: args.description,
        status: 'Unstarted',
      };
      tasks.push(taskValue);
      return taskValue;
    },
  },
};

const app = express();

db.connect(DB_HOST);

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/api' });
}

startServer();

// app.use('/api', cors(), bodyParser.json(), expressMiddleware(server));

app.listen({ port }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}/api`)
);
