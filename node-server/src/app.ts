import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import Task, { ITask } from "./models/task";
import Project, { IProject } from "./models/project" ;
import { connect } from "./db";

dotenv.config()

console.log('Configuring DB_HOST:', process.env.DB_HOST)
console.log('Configuring API_PORT:', process.env.API_PORT)

const port = process.env.API_PORT || 4000;
const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017/sharpway';

const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    projectId: String!
  }
  type Project {
    id: ID!
    name: String!
  }
  type Query {
    tasks: [Task!]!
    task(id: ID): Task
    projects: [Project!]!
    project(id: ID): Project
  }
  type Mutation {
    newTask(
        title: String!
        description: String!
        projectId: String!
    ): Task!
    updateTask(
      id: ID!
      title: String!
      description: String!
      status: String!
      projectId: String!
    ): Task!
    deleteTask(id: ID!): Boolean!
    newProject(
      name: String!
    ): Project!
  }
`;

const resolvers = {
  Query: {
    tasks: async () => {
      return await Task.find();
    },
    task: async (id: ITask['id']) => {
      return await Task.findById(id);
    },
    projects: async () => {
      return await Project.find();
    },
    project: async (id: IProject['id']) => {
      return await Project.findById(id);
    }
  },
  Mutation: {
    newTask: async (parent: ITask, args: {
      title: string, 
      description: string, 
      projectId: string
    }) => {
      return await Task.create({
        title: args.title,
        description: args.description,
        status: 'Unstarted',
        projectId: args.projectId,
      });
    },
    deleteTask: async (parent: Boolean, args: {id: string}) => {
      try {
        await Task.findOneAndRemove({ _id: args["id"] });
        return true;
      } catch (err) {
        console.error('Error: ', err);
        return false;
      }
    },
    updateTask: async (parent: ITask, task: ITask) => {
      return await Task.findOneAndUpdate(
        {
          _id: task.id,
        },
        {
          $set: {
            title: task.title,
            description: task.description,
            status: task.status,
            projectId: task.projectId,
          },
        },
        {
          new: true,
        }
      );
    },
    newProject: async (parent: IProject, args: {name: string}) => {
      return await Project.create({
        name: args.name,
      });
    }
  },
};

const app = express();

connect(DB_HOST);

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/api' });
}

startServer();

app.listen({ port }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}/api`)
);
