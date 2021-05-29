import { ActionTypes, IUser } from './types';

interface LoadUserReturnType {
  type: string;
  payload: IUser;
}

interface UpdateAvatarReturnType {
  type: string;
  payload: string;
}

interface UpdateUserReturnType {
  type: string;
  payload: IUser;
}

export function loadUser(payload: IUser): LoadUserReturnType {
  return {
    type: ActionTypes.loadUser,
    payload,
  };
}

export function updateAvatar(payload: string): UpdateAvatarReturnType {
  return {
    type: ActionTypes.updateAvatar,
    payload,
  };
}

export function updateUser(payload: IUser): UpdateUserReturnType {
  return {
    type: ActionTypes.updateUser,
    payload,
  };
}
