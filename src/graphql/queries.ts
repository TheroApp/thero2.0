/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrivateNote = /* GraphQL */ `
  query GetPrivateNote($id: ID!) {
    getPrivateNote(id: $id) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPrivateNotes = /* GraphQL */ `
  query ListPrivateNotes(
    $filter: ModelPrivateNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrivateNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getStudentUser = /* GraphQL */ `
  query GetStudentUser($id: ID!) {
    getStudentUser(id: $id) {
      id
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listStudentUsers = /* GraphQL */ `
  query ListStudentUsers(
    $filter: ModelStudentUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        score
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getStudentHistory = /* GraphQL */ `
  query GetStudentHistory($id: ID!) {
    getStudentHistory(id: $id) {
      id
      level
      accuracy
      date
      username
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listStudentHistorys = /* GraphQL */ `
  query ListStudentHistorys(
    $filter: ModelStudentHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        level
        accuracy
        date
        username
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
