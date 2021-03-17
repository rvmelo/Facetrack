import { ActionTypes, IUser } from './types';

interface AuthenticateUserReturnType {
  type: string;
}

interface UpdateUserReturnType {
  type: string;
  payload: IUser;
}

export function authenticateUser(): AuthenticateUserReturnType {
  return {
    type: ActionTypes.authenticateUser,
  };
}

export function updateUser({
  id,
  name,
  birthDate,
  sex,
  relationshipStatus,
  sexualOrientation,
}: IUser): UpdateUserReturnType {
  return {
    type: ActionTypes.updateUser,
    payload: {
      id,
      name,
      birthDate,
      sex,
      relationshipStatus,
      sexualOrientation,
    },
  };
}
