import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';

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

const port = process.env.PORT || 4000;

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

const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

app.use('/api', cors(), bodyParser.json(), expressMiddleware(server));

app.listen({ port }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}/api`)
);
