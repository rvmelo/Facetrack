/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/modules/user/actions';
import { IState } from '../../../store';
import { IUser } from '../../../store/modules/user/types';

interface RelationshipStatusOptions {
  option: 'single' | 'married' | 'serious relationship' | undefined;
}

interface ReturnValue {
  userRelationshipStatus: RelationshipStatusOptions;
  handleUserRelationshipStatus: (
    relationshipStatus: RelationshipStatusOptions,
  ) => void;
  handleContinue: () => void;
}

function useRelationshipStatusScreen(): ReturnValue {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const user = useSelector<IState, IUser>(state => state.user);

  const [
    userRelationshipStatus,
    setUserRelationshipStatus,
  ] = useState<RelationshipStatusOptions>({} as RelationshipStatusOptions);

  const handleUserRelationshipStatus = useCallback(
    (relationshipStatus: RelationshipStatusOptions) => {
      setUserRelationshipStatus({ ...relationshipStatus });
    },
    [],
  );

  const handleContinue = useCallback(() => {
    // a button should call api and create user
    dispatch(
      updateUser({
        ...user,
        relationshipStatus: userRelationshipStatus?.option,
      }),
    );
    navigation.navigate('RelationshipStatusScreen');
  }, [navigation, dispatch, user, userRelationshipStatus]);

  return {
    userRelationshipStatus,
    handleUserRelationshipStatus,
    handleContinue,
  };
}

export default useRelationshipStatusScreen;
