/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ActionTypes {
  authenticateUser = 'AUTHENTICATE_USER',
}

export interface IUser {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female' | 'null';
  sexualOrientation:
    | 'heterosexual'
    | 'homosexual'
    | 'bisexual'
    | 'asexual'
    | 'null';
}
