import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback, useEffect, useRef } from 'react';

//   constants
import { introMessagesKey } from '../../constants/storage';

interface IntroProps {
  introKey:
    | 'isTrackingScreenFirstLaunch'
    | 'isRateUserFirstLaunch'
    | 'isProfileStarFirstLaunch'
    | 'isProfileEvaluationsFirstLaunch'
    | 'isRandomUserFirstLaunch';
}

interface ReturnType {
  introModalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIntroModalVisible: (value: boolean) => void;
}

export function useIntroModal({ introKey }: IntroProps): ReturnType {
  const [introModalVisible, setIntroModalVisible] = useState(false);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setModalVisibility = useCallback(async () => {
    const introObject = await AsyncStorage.getItem(introMessagesKey);

    if (!introObject) {
      await AsyncStorage.setItem(
        introMessagesKey,
        JSON.stringify({ [introKey]: true }),
      );

      isMounted.current && setIntroModalVisible(true);
      return;
    }

    const parsedObject = JSON.parse(introObject);

    if (!parsedObject[introKey]) {
      Object.assign(parsedObject, { ...parsedObject, [introKey]: true });

      await AsyncStorage.setItem(
        introMessagesKey,
        JSON.stringify(parsedObject),
      );
      isMounted.current && setIntroModalVisible(true);
      return;
    }

    isMounted.current && setIntroModalVisible(false);
  }, [introKey]);

  useEffect(() => {
    setModalVisibility();
  }, [setModalVisibility]);

  return {
    introModalVisible,
    setIntroModalVisible,
  };
}
