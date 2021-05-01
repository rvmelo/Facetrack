import { ActionTypes, IUser } from './types';

interface CreateUserReturnType {
  type: string;
  payload: IUser;
}

export function createUser(payload: IUser): CreateUserReturnType {
  return {
    type: ActionTypes.createUser,
    payload,
  };
}

export function loadUser(payload: IUser): CreateUserReturnType {
  return {
    type: ActionTypes.loadUser,
    payload,
  };
}
