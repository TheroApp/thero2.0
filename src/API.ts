/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStudentUserInput = {
  id?: string | null,
  score: number,
  teacherName: string,
  userName: string,
  goalLevels?: Array< number | null > | null,
  repeat?: number | null,
  repeatTimeFrame?: string | null,
  goalDueDate?: string | null,
  goalSetDate?: string | null,
};

export type ModelStudentUserConditionInput = {
  score?: ModelIntInput | null,
  teacherName?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  goalLevels?: ModelIntInput | null,
  repeat?: ModelIntInput | null,
  repeatTimeFrame?: ModelStringInput | null,
  goalDueDate?: ModelStringInput | null,
  goalSetDate?: ModelStringInput | null,
  and?: Array< ModelStudentUserConditionInput | null > | null,
  or?: Array< ModelStudentUserConditionInput | null > | null,
  not?: ModelStudentUserConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type StudentUser = {
  __typename: "StudentUser",
  id?: string,
  score?: number,
  teacherName?: string,
  userName?: string,
  goalLevels?: Array< number | null > | null,
  repeat?: number | null,
  repeatTimeFrame?: string | null,
  goalDueDate?: string | null,
  goalSetDate?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateStudentUserInput = {
  id: string,
  score?: number | null,
  teacherName?: string | null,
  userName?: string | null,
  goalLevels?: Array< number | null > | null,
  repeat?: number | null,
  repeatTimeFrame?: string | null,
  goalDueDate?: string | null,
  goalSetDate?: string | null,
};

export type DeleteStudentUserInput = {
  id?: string | null,
};

export type CreateStudentHistoryInput = {
  id?: string | null,
  level: number,
  accuracy: number,
  date: string,
  username: string,
};

export type ModelStudentHistoryConditionInput = {
  level?: ModelIntInput | null,
  accuracy?: ModelIntInput | null,
  date?: ModelStringInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelStudentHistoryConditionInput | null > | null,
  or?: Array< ModelStudentHistoryConditionInput | null > | null,
  not?: ModelStudentHistoryConditionInput | null,
};

export type StudentHistory = {
  __typename: "StudentHistory",
  id?: string,
  level?: number,
  accuracy?: number,
  date?: string,
  username?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateStudentHistoryInput = {
  id: string,
  level?: number | null,
  accuracy?: number | null,
  date?: string | null,
  username?: string | null,
};

export type DeleteStudentHistoryInput = {
  id?: string | null,
};

export type ModelStudentUserFilterInput = {
  id?: ModelIDInput | null,
  score?: ModelIntInput | null,
  teacherName?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  goalLevels?: ModelIntInput | null,
  repeat?: ModelIntInput | null,
  repeatTimeFrame?: ModelStringInput | null,
  goalDueDate?: ModelStringInput | null,
  goalSetDate?: ModelStringInput | null,
  and?: Array< ModelStudentUserFilterInput | null > | null,
  or?: Array< ModelStudentUserFilterInput | null > | null,
  not?: ModelStudentUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStudentUserConnection = {
  __typename: "ModelStudentUserConnection",
  items?:  Array<StudentUser | null > | null,
  nextToken?: string | null,
};

export type ModelStudentHistoryFilterInput = {
  id?: ModelIDInput | null,
  level?: ModelIntInput | null,
  accuracy?: ModelIntInput | null,
  date?: ModelStringInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelStudentHistoryFilterInput | null > | null,
  or?: Array< ModelStudentHistoryFilterInput | null > | null,
  not?: ModelStudentHistoryFilterInput | null,
};

export type ModelStudentHistoryConnection = {
  __typename: "ModelStudentHistoryConnection",
  items?:  Array<StudentHistory | null > | null,
  nextToken?: string | null,
};

export type CreateStudentUserMutationVariables = {
  input?: CreateStudentUserInput,
  condition?: ModelStudentUserConditionInput | null,
};

export type CreateStudentUserMutation = {
  createStudentUser?:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    teacherName: string,
    userName: string,
    goalLevels?: Array< number | null > | null,
    repeat?: number | null,
    repeatTimeFrame?: string | null,
    goalDueDate?: string | null,
    goalSetDate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStudentUserMutationVariables = {
  input?: UpdateStudentUserInput,
  condition?: ModelStudentUserConditionInput | null,
};

export type UpdateStudentUserMutation = {
  updateStudentUser?:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    teacherName: string,
    userName: string,
    goalLevels?: Array< number | null > | null,
    repeat?: number | null,
    repeatTimeFrame?: string | null,
    goalDueDate?: string | null,
    goalSetDate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStudentUserMutationVariables = {
  input?: DeleteStudentUserInput,
  condition?: ModelStudentUserConditionInput | null,
};

export type DeleteStudentUserMutation = {
  deleteStudentUser?:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    teacherName: string,
    userName: string,
    goalLevels?: Array< number | null > | null,
    repeat?: number | null,
    repeatTimeFrame?: string | null,
    goalDueDate?: string | null,
    goalSetDate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStudentHistoryMutationVariables = {
  input?: CreateStudentHistoryInput,
  condition?: ModelStudentHistoryConditionInput | null,
};

export type CreateStudentHistoryMutation = {
  createStudentHistory?:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStudentHistoryMutationVariables = {
  input?: UpdateStudentHistoryInput,
  condition?: ModelStudentHistoryConditionInput | null,
};

export type UpdateStudentHistoryMutation = {
  updateStudentHistory?:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStudentHistoryMutationVariables = {
  input?: DeleteStudentHistoryInput,
  condition?: ModelStudentHistoryConditionInput | null,
};

export type DeleteStudentHistoryMutation = {
  deleteStudentHistory?:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetStudentUserQueryVariables = {
  id?: string,
};

export type GetStudentUserQuery = {
  getStudentUser?:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    teacherName: string,
    userName: string,
    goalLevels?: Array< number | null > | null,
    repeat?: number | null,
    repeatTimeFrame?: string | null,
    goalDueDate?: string | null,
    goalSetDate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStudentUsersQueryVariables = {
  filter?: ModelStudentUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentUsersQuery = {
  listStudentUsers?:  {
    __typename: "ModelStudentUserConnection",
    items?:  Array< {
      __typename: "StudentUser",
      id: string,
      score: number,
      teacherName: string,
      userName: string,
      goalLevels?: Array< number | null > | null,
      repeat?: number | null,
      repeatTimeFrame?: string | null,
      goalDueDate?: string | null,
      goalSetDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetStudentHistoryQueryVariables = {
  id?: string,
};

export type GetStudentHistoryQuery = {
  getStudentHistory?:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStudentHistorysQueryVariables = {
  filter?: ModelStudentHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentHistorysQuery = {
  listStudentHistorys?:  {
    __typename: "ModelStudentHistoryConnection",
    items?:  Array< {
      __typename: "StudentHistory",
      id: string,
      level: number,
      accuracy: number,
      date: string,
      username: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStudentUserSubscription = {
  onCreateStudentUser?:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    teacherName: string,
    userName: string,
    goalLevels?: Array< number | null > | null,
    repeat?: number | null,
    repeatTimeFrame?: string | null,
    goalDueDate?: string | null,
    goalSetDate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStudentUserSubscription = {
  onUpdateStudentUser?:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    teacherName: string,
    userName: string,
    goalLevels?: Array< number | null > | null,
    repeat?: number | null,
    repeatTimeFrame?: string | null,
    goalDueDate?: string | null,
    goalSetDate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStudentUserSubscription = {
  onDeleteStudentUser?:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    teacherName: string,
    userName: string,
    goalLevels?: Array< number | null > | null,
    repeat?: number | null,
    repeatTimeFrame?: string | null,
    goalDueDate?: string | null,
    goalSetDate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStudentHistorySubscription = {
  onCreateStudentHistory?:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStudentHistorySubscription = {
  onUpdateStudentHistory?:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStudentHistorySubscription = {
  onDeleteStudentHistory?:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
