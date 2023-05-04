const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require('apollo-server-express');
require('dotenv').config();
const models = require('./models');

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
    task(id: ID): Task
  }
  type Mutation {
    newTask(
        title: String!
        description: String!
    ): Task!
    updateTask(
      id: ID!
      title: String!
      description: String!
      status: String!
    ): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    tasks: async () => {
      return await models.Task.find();
    },
    task: async (parent, args) => {
      return await models.Task.findById(args.id);
    },
  },
  Mutation: {
    newTask: async (parent, args) => {
      return await models.Task.create({
        title: args.title,
        description: args.description,
        status: 'Unstarted',
      });
    },
    deleteTask: async (parent, { id }) => {
      try {
        await models.Task.findOneAndRemove({ _id: id });
        return true;
      } catch (err) {
        console.error('Error: ', err);
        return false;
      }
    },
    updateTask: async (parent, { title, id, description, status }) => {
      return await models.Task.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            title,
            description,
            status,
          },
        },
        {
          new: true,
        }
      );
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
