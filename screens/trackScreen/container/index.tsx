import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import Slider from '@react-native-community/slider';

//  components
import { useTrackScreen } from '../useTrackScreen';
import { ModalComponent } from './modalComponent';
import { IntroModal } from '../../../components/introModal';

//  styles
import {
  TouchableInterface,
  Container,
  TrackButtonContainer,
  ScreenText,
} from './styles';

//  constants
import Colors from '../../../constants/colors';

//  i18n
import { translate } from '../../../i18n/src/locales';

export const TrackScreen: React.FC = () => {
  const {
    users,
    isVisible,
    setIsVisible,
    distance,
    setDistance,
    isLoading,
    isRefreshing,
    onRefresh,
    setOnMomentumScrollBegin,
    onListEnd,
  } = useTrackScreen();

  return (
    <>
      <Container>
        <ScreenText>
          {translate('trackDistance')}: {distance.toFixed(0)}
        </ScreenText>
        <Slider
          style={{ width: 200, height: 40, marginVertical: 20 }}
          minimumValue={100}
          maximumValue={1000}
          step={100}
          thumbTintColor={Colors.primary}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor={Colors.accent}
          onValueChange={value => setDistance(value)}
          value={distance}
        />
        <TouchableInterface onPress={() => setIsVisible(true)}>
          <TrackButtonContainer>
            <Ionicons name="md-location" size={40} color={Colors.accent} />
          </TrackButtonContainer>
        </TouchableInterface>
        <ScreenText>{translate('track')}</ScreenText>
      </Container>
      <ModalComponent
        users={users}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        onListEnd={onListEnd}
        setOnMomentumScrollBegin={setOnMomentumScrollBegin}
        distance={distance}
      />
      <IntroModal
        iconName="md-location"
        text={translate('trackingScreenIntro')}
        introKey="isTrackingScreenFirstLaunch"
      />
    </>
  );
};
