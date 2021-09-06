/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ActionTypes {
  loadUser = 'LOAD_USER',

  updateAvatarRequest = 'UPDATE_AVATAR_REQUEST',
  updateAvatarSuccess = 'UPDATE_AVATAR_SUCCESS',
  updateAvatarFailure = 'UPDATE_AVATAR_FAILURE',
  updateAvatarLoading = 'UPDATE_AVATAR_LOADING',

  updateUserRequest = 'UPDATE_USER_REQUEST',
  updateUserSuccess = 'UPDATE_USER_SUCCESS',
  updateUserFailure = 'UPDATE_USER_FAILURE',

  updateUserLoadState = 'UPDATE_USER_LOAD_STATE',
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
  avatar: string;
  rate: number;
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

export interface IUserState {
  user: IUser;
  isAvatarLoading: boolean;
  isAvatarUpdateFailure: boolean;
  isUserUpdateFailure: boolean;
  isUserLoading: boolean;
}
