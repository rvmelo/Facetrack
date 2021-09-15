/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegisterStackParamList } from '../../../routes/types';

// redux
import { IUser } from '../../../store/modules/user/types';

interface RelationshipStatusOptions {
  option: 'single' | 'married' | 'serious relationship' | undefined;
}

type NavigationProps = StackNavigationProp<
  RegisterStackParamList,
  'RelationshipStatusScreen'
>;

interface ReturnValue {
  userRelationshipStatus: RelationshipStatusOptions;
  handleUserRelationshipStatus: (
    relationshipStatus: RelationshipStatusOptions,
  ) => void;
  handleContinue: () => void;
}

function useRelationshipStatusScreen(): ReturnValue {
  const navigation = useNavigation<NavigationProps>();

  const { params } = useRoute();

  const user = params as IUser;

  const [userRelationshipStatus, setUserRelationshipStatus] =
    useState<RelationshipStatusOptions>({} as RelationshipStatusOptions);

  const handleUserRelationshipStatus = useCallback(
    (relationshipStatus: RelationshipStatusOptions) => {
      setUserRelationshipStatus({ ...relationshipStatus });
    },
    [],
  );

  const handleContinue = useCallback(() => {
    navigation.navigate('InstagramScreen', {
      ...user,
      relationshipStatus: userRelationshipStatus?.option,
    });
  }, [navigation, user, userRelationshipStatus]);

  return {
    userRelationshipStatus,
    handleUserRelationshipStatus,
    handleContinue,
  };
}

export default useRelationshipStatusScreen;
