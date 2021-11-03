import React, { useCallback, useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

// navigation
import { useRoute } from '@react-navigation/native';

//  services
import { AxiosError } from 'axios';
import api from '../../services/api';
import { showToast } from '../../services/toast';

//  redux
import { IUser, UserMedia } from '../../store/modules/user/types';

//  i18n
import { translate } from '../../i18n/src/locales';

interface RouteParams {
  user: IUser;
}

interface EvaluationInput {
  value: number;
  message?: string;
}

interface ReturnType {
  modalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setModalVisible: (value: boolean) => void;
  userMedia: UserMedia[] | undefined;
  // eslint-disable-next-line no-unused-vars
  handleEvaluation: (input: EvaluationInput) => void;
  user: IUser;
  scroll: React.RefObject<ScrollView>;
}

export function useDefaultUser(): ReturnType {
  const route = useRoute();

  const { user } = route?.params as RouteParams;

  const userMedia = user?.instagram?.userMedia;

  const [modalVisible, setModalVisible] = useState(false);

  const scroll = useRef<ScrollView>(null);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleEvaluation = useCallback(
    async ({ value, message = '' }: EvaluationInput) => {
      try {
        if (value <= 0) return;

        await api.post('/evaluation', {
          value,
          toUserId: user.userProviderId,
          message: message?.trim(),
        });

        isMounted.current && setModalVisible(false);
      } catch (err) {
        const error = err as AxiosError;

        if (error?.response?.status === 401) {
          return;
        }

        showToast({
          message: translate('sendEvaluationError'),
        });
      }
    },
    [user.userProviderId],
  );

  return {
    modalVisible,
    setModalVisible,
    userMedia,
    handleEvaluation,
    user,
    scroll,
  };
}
