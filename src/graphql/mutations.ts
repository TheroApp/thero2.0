/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudentUser = /* GraphQL */ `
  mutation CreateStudentUser(
    $input: CreateStudentUserInput!
    $condition: ModelStudentUserConditionInput
  ) {
    createStudentUser(input: $input, condition: $condition) {
      id
      score
      teacherName
      userName
      createdAt
      updatedAt
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
      userName
      createdAt
      updatedAt
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
      userName
      createdAt
      updatedAt
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
    }
  }
`;
