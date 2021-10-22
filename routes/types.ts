import { NavigatorScreenParams } from '@react-navigation/native';
import { IUser } from '../store/modules/user/types';

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
  Settings: undefined;
};

export type NotificationStackParamList = {
  NotificationScreen: undefined;
  NotificationUserScreen: { user: IUser };
};

export type EvaluationStackParamList = {
  TrackOptionScreen: undefined;
  RateScreen: { value: number; userProviderId: string } | undefined;
  TrackScreen: undefined;
  RandomUserScreen: { user: IUser };
  TrackedUserScreen: { user: IUser };
};

export type SearchStackParamList = {
  SearchScreen: undefined;
  SearchedUserScreen: { user: IUser };
  MyProfileRoutes: undefined;
};

export type TabParamList = {
  Evaluation: undefined;
  Search: undefined;
  Notifications: undefined;
  Profile: NavigatorScreenParams<undefined>;
};
