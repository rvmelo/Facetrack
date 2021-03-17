/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ActionTypes {
  authenticateUser = 'AUTHENTICATE_USER',
  updateUser = 'UPDATE_USER',
}

export interface IUser {
  id: string;
  name: string;
  birthDate: string;
  sex: 'male' | 'female' | undefined;
  relationshipStatus: 'single' | 'serious relationship' | 'married' | undefined;
  sexualOrientation:
    | 'heterosexual'
    | 'homosexual'
    | 'bisexual'
    | 'asexual'
    | undefined;
}
