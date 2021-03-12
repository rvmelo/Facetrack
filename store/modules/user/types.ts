/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ActionTypes {
  authenticateUser = 'AUTHENTICATE_USER',
  updateUser = 'UPDATE_USER',
}

export interface IUser {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female' | 'null';
  relationshipStatus: 'single' | 'serious relationship' | 'married' | 'null';
  sexualOrientation:
    | 'heterosexual'
    | 'homosexual'
    | 'bisexual'
    | 'asexual'
    | 'null';
}
