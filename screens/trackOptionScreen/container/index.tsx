import React from 'react';
import { Ionicons } from '@expo/vector-icons';

//  navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

//  i18n
import { translate } from '../../../i18n/src/locales';

import { OptionButton } from './optionButton';

import Colors from '../../../constants/colors';

//  components
import { IntroModal } from '../../../components/introModal';
import { ButtonsContainer, Container, IconContainer, IconText } from './styles';
import { EvaluationStackParamList } from '../../../routes/types';

type NavigationProps = StackNavigationProp<
  EvaluationStackParamList,
  'TrackOptionScreen'
>;

export const TrackOptionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <Container>
        <IconContainer>
          <Ionicons name="md-location" size={150} color={Colors.primary} />
          <IconText>{translate('trackInfoLabel')}</IconText>
        </IconContainer>
        <ButtonsContainer>
          <OptionButton
            text={translate('randomTrack')}
            onPress={() => navigation.navigate('RateScreen')}
          />
          <OptionButton
            text={translate('trackByDistance')}
            onPress={() => navigation.navigate('TrackScreen')}
          />
        </ButtonsContainer>
      </Container>
      <IntroModal
        iconName="md-locate"
        text="On this screen, you can choose between two tracking options. If you choose the first option, you can track random users in this app. The second option has a Watch Dogs feel to it and allows you to track users near you."
      />
    </>
  );
};
