import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import Slider from '@react-native-community/slider';

//  components
import { useTrackScreen } from '../useTrackScreen';
import { ModalComponent } from './modalComponent';

//  styles
import {
  TouchableInterface,
  Container,
  TrackButtonContainer,
  ScreenText,
} from './styles';

//  constants
import Colors from '../../../constants/colors';

export const TrackScreen: React.FC = () => {
  const {
    users,
    isVisible,
    setIsVisible,
    distance,
    setDistance,
    onUserTracking,
  } = useTrackScreen();

  return (
    <>
      <Container>
        <ScreenText>Distance in meters: {distance.toFixed(0)}</ScreenText>
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
        <TouchableInterface onPress={onUserTracking}>
          <TrackButtonContainer>
            <Ionicons name="md-location" size={40} color={Colors.accent} />
          </TrackButtonContainer>
        </TouchableInterface>
        <ScreenText>Track</ScreenText>
      </Container>
      <ModalComponent
        users={users}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};
