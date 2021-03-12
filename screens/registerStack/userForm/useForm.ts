/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export interface userFormData {
  sex: 'male' | 'female';
  relationshipStatus: number | string;
  sexualOrientation: number | string;
}

interface ReturnValue {
  isMaleButtonDisabled: boolean;
  isFemaleButtonDisabled: boolean;
  userData: userFormData;
  handleSetMaleUser: () => void;
  handleSetFemaleUser: () => void;
  handleSexualOrientation: (itemValue: number | string) => void;
  handleRelationshipStatus: (itemValue: number | string) => void;
  handleContinue: () => void;
}

function useForm(): ReturnValue {
  const [userData, setUserData] = useState<userFormData>({
    sex: 'male',
    relationshipStatus: 'single',
    sexualOrientation: 'heterosexual',
  });
  const [isMaleButtonDisabled, setIsMaleButtonDisable] = useState(false);
  const [isFemaleButtonDisabled, setIsFemaleButtonDisable] = useState(true);

  const handleSetMaleUser = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      sex: 'male',
    }));
    setIsMaleButtonDisable(false);
    setIsFemaleButtonDisable(true);
  }, []);

  const handleSetFemaleUser = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      sex: 'female',
    }));
    setIsMaleButtonDisable(true);
    setIsFemaleButtonDisable(false);
  }, []);

  const handleSexualOrientation = useCallback(
    (itemValue: number | string) =>
      setUserData(prev => {
        console.log('item value:', itemValue);
        return { ...prev, sexualOrientation: itemValue };
      }),
    [],
  );

  const handleRelationshipStatus = useCallback(
    (itemValue: number | string) =>
      setUserData(prev => ({ ...prev, relationshipStatus: itemValue })),
    [],
  );

  const handleContinue = useCallback(async () => {
    await AsyncStorage.setItem('@Facetrack:user', JSON.stringify(userData));
  }, [userData]);

  return {
    userData,
    handleSetMaleUser,
    handleSetFemaleUser,
    isMaleButtonDisabled,
    isFemaleButtonDisabled,
    handleSexualOrientation,
    handleRelationshipStatus,
    handleContinue,
  };
}

export default useForm;
