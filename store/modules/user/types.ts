/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ActionTypes {
  updateUser = 'UPDATE_USER',
}

export interface UserMedia {
  id: string;
  caption: string;
  media_url: string;
}

export interface IUser {
  userProviderId: string;
  name: string;
  birthDate: Date | undefined;
  sex: 'male' | 'female' | undefined;
  relationshipStatus: 'single' | 'serious relationship' | 'married' | undefined;
  sexualOrientation:
    | 'heterosexual'
    | 'homosexual'
    | 'bisexual'
    | 'asexual'
    | undefined;
  instagram:
    | {
        userName: string;
        userMedia: UserMedia[];
      }
    | undefined;
}
