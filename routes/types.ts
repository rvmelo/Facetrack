import { NavigatorScreenParams } from '@react-navigation/native';
import { media_types } from '../store/modules/user/types';

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

export type TabParamList = {
  RateScreen: undefined;
  Search: undefined;
  Notifications: undefined;
  Profile: NavigatorScreenParams<undefined>;
};
