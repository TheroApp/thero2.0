/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTaskInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  status?: string | null,
};

export type ModelTaskConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

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


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateTaskInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  status?: string | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type CreatePrivateNoteInput = {
  id?: string | null,
  content: string,
};

export type ModelPrivateNoteConditionInput = {
  content?: ModelStringInput | null,
  and?: Array< ModelPrivateNoteConditionInput | null > | null,
  or?: Array< ModelPrivateNoteConditionInput | null > | null,
  not?: ModelPrivateNoteConditionInput | null,
};

export type UpdatePrivateNoteInput = {
  id: string,
  content?: string | null,
};

export type DeletePrivateNoteInput = {
  id?: string | null,
};

export type CreateStudentUserInput = {
  id?: string | null,
  score: number,
};

export type ModelStudentUserConditionInput = {
  score?: ModelIntInput | null,
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

export type UpdateStudentUserInput = {
  id: string,
  score?: number | null,
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

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
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

export type ModelPrivateNoteFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelPrivateNoteFilterInput | null > | null,
  or?: Array< ModelPrivateNoteFilterInput | null > | null,
  not?: ModelPrivateNoteFilterInput | null,
};

export type ModelStudentUserFilterInput = {
  id?: ModelIDInput | null,
  score?: ModelIntInput | null,
  and?: Array< ModelStudentUserFilterInput | null > | null,
  or?: Array< ModelStudentUserFilterInput | null > | null,
  not?: ModelStudentUserFilterInput | null,
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

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePrivateNoteMutationVariables = {
  input: CreatePrivateNoteInput,
  condition?: ModelPrivateNoteConditionInput | null,
};

export type CreatePrivateNoteMutation = {
  createPrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdatePrivateNoteMutationVariables = {
  input: UpdatePrivateNoteInput,
  condition?: ModelPrivateNoteConditionInput | null,
};

export type UpdatePrivateNoteMutation = {
  updatePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeletePrivateNoteMutationVariables = {
  input: DeletePrivateNoteInput,
  condition?: ModelPrivateNoteConditionInput | null,
};

export type DeletePrivateNoteMutation = {
  deletePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateStudentUserMutationVariables = {
  input: CreateStudentUserInput,
  condition?: ModelStudentUserConditionInput | null,
};

export type CreateStudentUserMutation = {
  createStudentUser:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateStudentUserMutationVariables = {
  input: UpdateStudentUserInput,
  condition?: ModelStudentUserConditionInput | null,
};

export type UpdateStudentUserMutation = {
  updateStudentUser:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteStudentUserMutationVariables = {
  input: DeleteStudentUserInput,
  condition?: ModelStudentUserConditionInput | null,
};

export type DeleteStudentUserMutation = {
  deleteStudentUser:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateStudentHistoryMutationVariables = {
  input: CreateStudentHistoryInput,
  condition?: ModelStudentHistoryConditionInput | null,
};

export type CreateStudentHistoryMutation = {
  createStudentHistory:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateStudentHistoryMutationVariables = {
  input: UpdateStudentHistoryInput,
  condition?: ModelStudentHistoryConditionInput | null,
};

export type UpdateStudentHistoryMutation = {
  updateStudentHistory:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteStudentHistoryMutationVariables = {
  input: DeleteStudentHistoryInput,
  condition?: ModelStudentHistoryConditionInput | null,
};

export type DeleteStudentHistoryMutation = {
  deleteStudentHistory:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      status: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPrivateNoteQueryVariables = {
  id: string,
};

export type GetPrivateNoteQuery = {
  getPrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListPrivateNotesQueryVariables = {
  filter?: ModelPrivateNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPrivateNotesQuery = {
  listPrivateNotes:  {
    __typename: "ModelPrivateNoteConnection",
    items:  Array< {
      __typename: "PrivateNote",
      id: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetStudentUserQueryVariables = {
  id: string,
};

export type GetStudentUserQuery = {
  getStudentUser:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListStudentUsersQueryVariables = {
  filter?: ModelStudentUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentUsersQuery = {
  listStudentUsers:  {
    __typename: "ModelStudentUserConnection",
    items:  Array< {
      __typename: "StudentUser",
      id: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetStudentHistoryQueryVariables = {
  id: string,
};

export type GetStudentHistoryQuery = {
  getStudentHistory:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListStudentHistorysQueryVariables = {
  filter?: ModelStudentHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentHistorysQuery = {
  listStudentHistorys:  {
    __typename: "ModelStudentHistoryConnection",
    items:  Array< {
      __typename: "StudentHistory",
      id: string,
      level: number,
      accuracy: number,
      date: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePrivateNoteSubscriptionVariables = {
  owner: string,
};

export type OnCreatePrivateNoteSubscription = {
  onCreatePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdatePrivateNoteSubscriptionVariables = {
  owner: string,
};

export type OnUpdatePrivateNoteSubscription = {
  onUpdatePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeletePrivateNoteSubscriptionVariables = {
  owner: string,
};

export type OnDeletePrivateNoteSubscription = {
  onDeletePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateStudentUserSubscriptionVariables = {
  owner: string,
};

export type OnCreateStudentUserSubscription = {
  onCreateStudentUser:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateStudentUserSubscriptionVariables = {
  owner: string,
};

export type OnUpdateStudentUserSubscription = {
  onUpdateStudentUser:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteStudentUserSubscriptionVariables = {
  owner: string,
};

export type OnDeleteStudentUserSubscription = {
  onDeleteStudentUser:  {
    __typename: "StudentUser",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateStudentHistorySubscriptionVariables = {
  owner: string,
};

export type OnCreateStudentHistorySubscription = {
  onCreateStudentHistory:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateStudentHistorySubscriptionVariables = {
  owner: string,
};

export type OnUpdateStudentHistorySubscription = {
  onUpdateStudentHistory:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteStudentHistorySubscriptionVariables = {
  owner: string,
};

export type OnDeleteStudentHistorySubscription = {
  onDeleteStudentHistory:  {
    __typename: "StudentHistory",
    id: string,
    level: number,
    accuracy: number,
    date: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
