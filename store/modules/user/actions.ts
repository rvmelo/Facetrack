import { ActionTypes } from './types';

interface AuthenticateUserReturnType {
  type: string;
}

export function authenticateUser(): AuthenticateUserReturnType {
  return {
    type: ActionTypes.authenticateUser,
  };
}
