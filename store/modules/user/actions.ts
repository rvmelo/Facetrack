import { ActionTypes, IUser } from './types';

interface UpdateUserReturnType {
  type: string;
  payload: IUser;
}

interface UpdateAvatarReturnType {
  type: string;
  payload: string;
}

interface UpdateLoadingStateReturnType {
  type: string;
  payload: boolean;
}

interface UpdateUserRateReturnType {
  type: string;
  payload: number;
}

interface ActionReturnType {
  type: string;
}

//  local user loading...
export function loadUser(payload: IUser): UpdateUserReturnType {
  return {
    type: ActionTypes.loadUser,
    payload,
  };
}

export function updateAvatarRequest(payload: string): UpdateAvatarReturnType {
  return {
    type: ActionTypes.updateAvatarRequest,
    payload,
  };
}

export function updateAvatarSuccess(payload: string): UpdateAvatarReturnType {
  return {
    type: ActionTypes.updateAvatarSuccess,
    payload,
  };
}

export function updateAvatarFailure(): ActionReturnType {
  return {
    type: ActionTypes.updateAvatarFailure,
  };
}

export function updateAvatarLoading(
  payload: boolean,
): UpdateLoadingStateReturnType {
  return {
    type: ActionTypes.updateAvatarLoading,
    payload,
  };
}

export function updateUserLoadState(
  payload: boolean,
): UpdateLoadingStateReturnType {
  return {
    type: ActionTypes.updateUserLoadState,
    payload,
  };
}

export function updateUserRequest(payload: IUser): UpdateUserReturnType {
  return {
    type: ActionTypes.updateUserRequest,
    payload,
  };
}

export function updateUserSuccess(payload: IUser): UpdateUserReturnType {
  return {
    type: ActionTypes.updateUserSuccess,
    payload,
  };
}

export function updateUserFailure(): ActionReturnType {
  return {
    type: ActionTypes.updateUserFailure,
  };
}

export function updateUserRate(payload: number): UpdateUserRateReturnType {
  return {
    type: ActionTypes.updateUserRate,
    payload,
  };
}
