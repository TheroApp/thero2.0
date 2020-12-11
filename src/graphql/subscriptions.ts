/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudentUser = /* GraphQL */ `
  subscription OnCreateStudentUser($owner: String!) {
    onCreateStudentUser(owner: $owner) {
      id
      score
      teacherName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateStudentUser = /* GraphQL */ `
  subscription OnUpdateStudentUser($owner: String!) {
    onUpdateStudentUser(owner: $owner) {
      id
      score
      teacherName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteStudentUser = /* GraphQL */ `
  subscription OnDeleteStudentUser($owner: String!) {
    onDeleteStudentUser(owner: $owner) {
      id
      score
      teacherName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateStudentHistory = /* GraphQL */ `
  subscription OnCreateStudentHistory {
    onCreateStudentHistory {
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
export const onUpdateStudentHistory = /* GraphQL */ `
  subscription OnUpdateStudentHistory {
    onUpdateStudentHistory {
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
export const onDeleteStudentHistory = /* GraphQL */ `
  subscription OnDeleteStudentHistory {
    onDeleteStudentHistory {
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
