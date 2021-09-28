import { NavigatorScreenParams } from '@react-navigation/native';
import { IUser, media_types } from '../store/modules/user/types';

//  register routes

export type RegisterStackParamList = {
  Login: undefined;
  BirthDateScreen: IUser;
  GenderScreen: IUser;
  SexualOrientationScreen: IUser;
  RelationshipStatusScreen: IUser;
  InstagramScreen: IUser;
};

//  app routes

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Publication: {
    caption: string;
    media_type: media_types;
    media_url: string;
    date: string;
  };
  Settings: undefined;
};

export type NotificationStackParamList = {
  NotificationScreen: undefined;
  NotificationUserScreen: { user: IUser };
};

export type EvaluationStackParamList = {
  RateScreen: { value: number; userProviderId: string };
  RandomUserScreen: { user: IUser };
};

export type TabParamList = {
  Evaluation: undefined;
  Search: undefined;
  Notifications: undefined;
  Profile: NavigatorScreenParams<undefined>;
};
