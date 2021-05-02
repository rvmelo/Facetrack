import { ActionTypes, IUser } from './types';

interface LoadUserReturnType {
  type: string;
  payload: IUser;
}

export function loadUser(payload: IUser): LoadUserReturnType {
  return {
    type: ActionTypes.loadUser,
    payload,
  };
}
