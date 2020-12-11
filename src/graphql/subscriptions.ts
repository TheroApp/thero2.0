/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePrivateNote = /* GraphQL */ `
  subscription OnCreatePrivateNote($owner: String!) {
    onCreatePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePrivateNote = /* GraphQL */ `
  subscription OnUpdatePrivateNote($owner: String!) {
    onUpdatePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePrivateNote = /* GraphQL */ `
  subscription OnDeletePrivateNote($owner: String!) {
    onDeletePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
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
  subscription OnCreateStudentHistory($owner: String!) {
    onCreateStudentHistory(owner: $owner) {
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
export const onUpdateStudentHistory = /* GraphQL */ `
  subscription OnUpdateStudentHistory($owner: String!) {
    onUpdateStudentHistory(owner: $owner) {
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
export const onDeleteStudentHistory = /* GraphQL */ `
  subscription OnDeleteStudentHistory($owner: String!) {
    onDeleteStudentHistory(owner: $owner) {
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
