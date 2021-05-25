import { ActionTypes, IUser } from './types';

interface UpdateUserPayload {
  localAvatarUri: string;
  user: IUser;
}

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
  payload: UpdateUserPayload;
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

export function updateUser(payload: UpdateUserPayload): UpdateUserReturnType {
  return {
    type: ActionTypes.updateUser,
    payload,
  };
}
