// navigation
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { EvaluationStackParamList } from '../../routes/types';

//  redux
import { IUser, UserMedia } from '../../store/modules/user/types';

type NavigationProps = StackNavigationProp<
  EvaluationStackParamList,
  'RandomUserScreen'
>;

interface RouteParams {
  user: IUser;
}

interface EvaluationInput {
  value: number;
  message?: string;
}

interface ReturnValue {
  modalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setModalVisible: (value: boolean) => void;
  userMedia: UserMedia[] | undefined;
  // eslint-disable-next-line no-unused-vars
  handleEvaluation: (input: EvaluationInput) => void;
  user: IUser;
}

export function useRandomUserScreen(): ReturnValue {
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();

  const { user } = route?.params as RouteParams;

  const userMedia = user?.instagram?.userMedia;

  const [modalVisible, setModalVisible] = useState(false);

  const handleEvaluation = useCallback(
    ({ value, message = '' }: EvaluationInput) => {
      if (value <= 0) return;

      setModalVisible(false);
      navigation.navigate('RateScreen', {
        value,
        message: message?.trim(),
        userProviderId: user.userProviderId,
      });
    },
    [navigation, user.userProviderId],
  );

  return {
    modalVisible,
    setModalVisible,
    userMedia,
    handleEvaluation,
    user,
  };
}
