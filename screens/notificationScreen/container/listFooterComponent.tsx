import React from 'react';
import { ActivityIndicator } from 'react-native';

//  constants
import Colors from '../../../constants/colors';

interface ListFooterComponentProps {
  isLoading: boolean;
}

export const ListFooterComponent: React.FC<ListFooterComponentProps> = ({
  isLoading,
}) => {
  return isLoading ? (
    <ActivityIndicator color={Colors.primary} size="large" />
  ) : null;
};
