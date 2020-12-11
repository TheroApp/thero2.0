/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const createPrivateNote = /* GraphQL */ `
  mutation CreatePrivateNote(
    $input: CreatePrivateNoteInput!
    $condition: ModelPrivateNoteConditionInput
  ) {
    createPrivateNote(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePrivateNote = /* GraphQL */ `
  mutation UpdatePrivateNote(
    $input: UpdatePrivateNoteInput!
    $condition: ModelPrivateNoteConditionInput
  ) {
    updatePrivateNote(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePrivateNote = /* GraphQL */ `
  mutation DeletePrivateNote(
    $input: DeletePrivateNoteInput!
    $condition: ModelPrivateNoteConditionInput
  ) {
    deletePrivateNote(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createStudentUser = /* GraphQL */ `
  mutation CreateStudentUser(
    $input: CreateStudentUserInput!
    $condition: ModelStudentUserConditionInput
  ) {
    createStudentUser(input: $input, condition: $condition) {
      id
      score
      teacherName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateStudentUser = /* GraphQL */ `
  mutation UpdateStudentUser(
    $input: UpdateStudentUserInput!
    $condition: ModelStudentUserConditionInput
  ) {
    updateStudentUser(input: $input, condition: $condition) {
      id
      score
      teacherName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteStudentUser = /* GraphQL */ `
  mutation DeleteStudentUser(
    $input: DeleteStudentUserInput!
    $condition: ModelStudentUserConditionInput
  ) {
    deleteStudentUser(input: $input, condition: $condition) {
      id
      score
      teacherName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createStudentHistory = /* GraphQL */ `
  mutation CreateStudentHistory(
    $input: CreateStudentHistoryInput!
    $condition: ModelStudentHistoryConditionInput
  ) {
    createStudentHistory(input: $input, condition: $condition) {
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
export const updateStudentHistory = /* GraphQL */ `
  mutation UpdateStudentHistory(
    $input: UpdateStudentHistoryInput!
    $condition: ModelStudentHistoryConditionInput
  ) {
    updateStudentHistory(input: $input, condition: $condition) {
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
export const deleteStudentHistory = /* GraphQL */ `
  mutation DeleteStudentHistory(
    $input: DeleteStudentHistoryInput!
    $condition: ModelStudentHistoryConditionInput
  ) {
    deleteStudentHistory(input: $input, condition: $condition) {
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
