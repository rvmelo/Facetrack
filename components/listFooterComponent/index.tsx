import React from 'react';
import { ActivityIndicator, View } from 'react-native';

//  constants
import Colors from '../../constants/colors';

interface ListFooterComponentProps {
  isLoading: boolean;
}

export const ListFooterComponent: React.FC<ListFooterComponentProps> = ({
  isLoading,
}) => {
  return isLoading ? (
    <View
      style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}
    >
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  ) : null;
};
