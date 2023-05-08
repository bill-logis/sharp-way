import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
});

export const FETCH_TASKS = gql`
  #graphql
  {
    tasks {
      id
      title
      description
      status
    }
  }
`;

export const ADD_TASK = gql`
  mutation NewTask($title: String!, $description: String!) {
    newTask(title: $title, description: $description) {
      id
      title
      description
      status
    }
  }
`;

export const DEL_TASK = gql`
  mutation DelTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const fetchTasks = () => {
  return client.query({
    query: FETCH_TASKS,
  });
};

export const newTask = (title, description, status = 'Unstarted') => {
  console.log('api createTask');
  console.log('title', title, 'description', description);
  return client.mutate({
    mutation: ADD_TASK,
    variables: {
      title: title,
      description: description,
    },
  });
};

export const removeTask = (id) => {
  return client.mutate({
    mutation: DEL_TASK,
    variables: {
      id: id,
    },
  });
};
