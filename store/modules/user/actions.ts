import { ActionTypes, IUser } from './types';

interface LoadUserReturnType {
  type: string;
  payload: IUser;
}

interface UpdateAvatarReturnType {
  type: string;
  payload: string;
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
