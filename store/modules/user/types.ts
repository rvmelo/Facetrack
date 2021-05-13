/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ActionTypes {
  loadUser = 'LOAD_USER',
}

export const MEDIA_TYPES = {
  image: 'IMAGE',
  video: 'VIDEO',
  carousel_album: 'CAROUSEL_ALBUM',
};

export type media_types = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface UserMedia {
  id: string;
  caption: string;
  media_url: string;
  media_type: media_types;
  timestamp: string;
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
