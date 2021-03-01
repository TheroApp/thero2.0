/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudentUser = /* GraphQL */ `
  query GetStudentUser($id: ID!) {
    getStudentUser(id: $id) {
      id
      score
      teacherName
      createdAt
      updatedAt
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
        teacherName
        createdAt
        updatedAt
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
      }
      nextToken
    }
  }
`;
