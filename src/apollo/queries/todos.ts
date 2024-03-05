import { gql } from '@apollo/client'

export const getTodosQuery = gql`
  query GetTodos {
    allTodos {
      id
      title
      done
    }
  }
`;

export const getTodoQuery = gql`
  query($id: ID!) {
    Todo(id: $id) {
      id
      title
      done
    }
  }
`;

export const createTodoMutation = gql`
  mutation($title: String!, $done: Boolean!) {
    createTodo(title: $title, done: $done) {
      id
      title
      done
    }
  }
`;

export const updateTodoTitleMutation = gql`
  mutation($id: ID!, $title: String!) {
    updateTodo(id: $id, title: $title) {
      id
    }
  }
`;

export const updateTodoDoneMutation = gql`
  mutation($id: ID!, $done: Boolean!) {
    updateTodo(id: $id, done: $done) {
      id
    }
  }
`;

export const removeTodoMutation = gql`
  mutation($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
