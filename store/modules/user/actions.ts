import { ActionTypes, IUser } from './types';

interface UpdateUserReturnType {
  type: string;
  payload: IUser;
}

export function updateUser({
  userProviderId,
  name,
  birthDate,
  sex,
  relationshipStatus,
  sexualOrientation,
  instagram,
}: IUser): UpdateUserReturnType {
  return {
    type: ActionTypes.updateUser,
    payload: {
      userProviderId,
      name,
      birthDate,
      sex,
      relationshipStatus,
      sexualOrientation,
      instagram,
    },
  };
}
