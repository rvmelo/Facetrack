// navigation
import { useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import api from '../../services/api';

//  redux
import { IUser, UserMedia } from '../../store/modules/user/types';

interface RouteParams {
  user: IUser;
}

interface ReturnType {
  modalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setModalVisible: (value: boolean) => void;
  rate: number;
  // eslint-disable-next-line no-unused-vars
  setRate: (value: number) => void;
  userMedia: UserMedia[] | undefined;
  // eslint-disable-next-line no-unused-vars
  handleEvaluation: (value: number) => void;
  user: IUser;
}

export function useDefaultUser(): ReturnType {
  const route = useRoute();

  const { user } = route?.params as RouteParams;

  const userMedia = user?.instagram?.userMedia;

  const [modalVisible, setModalVisible] = useState(false);
  const [rate, setRate] = useState(0);

  const handleEvaluation = useCallback(
    async (value: number) => {
      if (value <= 0) return;

      await api.patch(
        `/evaluation?value=${value}&toUserId=${user.userProviderId}`,
      );

      setRate(value);

      setModalVisible(false);
    },
    [user.userProviderId],
  );

  return {
    modalVisible,
    setModalVisible,
    rate,
    setRate,
    userMedia,
    handleEvaluation,
    user,
  };
}
