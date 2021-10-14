import { ToastAndroid } from 'react-native';

interface showToastInput {
  message: string;
}

export const showToast = ({ message }: showToastInput): void => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
