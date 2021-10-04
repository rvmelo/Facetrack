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

interface ReturnValue {
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

export function useRandomUserScreen(): ReturnValue {
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();

  const { user } = route?.params as RouteParams;

  const userMedia = user?.instagram?.userMedia;

  const [modalVisible, setModalVisible] = useState(false);
  const [rate, setRate] = useState(0);

  const handleEvaluation = useCallback(
    (value: number) => {
      if (value <= 0) return;

      setRate(value);
      setModalVisible(false);
      navigation.navigate('RateScreen', {
        value,
        userProviderId: user.userProviderId,
      });
    },
    [navigation, user.userProviderId],
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
