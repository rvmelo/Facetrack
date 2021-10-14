import React from 'react';
import { Ionicons } from '@expo/vector-icons';

//  navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { OptionButton } from './optionButton';

import Colors from '../../../constants/colors';

import { ButtonsContainer, Container, IconContainer, IconText } from './styles';
import { EvaluationStackParamList } from '../../../routes/types';

type NavigationProps = StackNavigationProp<
  EvaluationStackParamList,
  'TrackOptionScreen'
>;

export const TrackOptionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Container>
      <IconContainer>
        <Ionicons name="md-location" size={150} color={Colors.primary} />
        <IconText>Choose your tracking option</IconText>
      </IconContainer>
      <ButtonsContainer>
        <OptionButton
          text="Track random users"
          onPress={() => navigation.navigate('RateScreen')}
        />
        <OptionButton
          text="Track users by location"
          onPress={() => navigation.navigate('TrackScreen')}
        />
      </ButtonsContainer>
    </Container>
  );
};
