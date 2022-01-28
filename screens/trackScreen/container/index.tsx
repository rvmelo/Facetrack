import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import Slider from '@react-native-community/slider';

//  navigation
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

//  components
import { useTrackScreen } from '../useTrackScreen';
import { ModalComponent } from './modal/modalComponent';

//  styles
import {
  TouchableInterface,
  Container,
  TrackButtonContainer,
  TrackButtonText,
  ScreenText,
  InfoText,
  SmallInfoText,
  InfoContainer,
  UIWrapper,
} from './styles';

//  constants
import Colors from '../../../constants/colors';

//  i18n
import { translate } from '../../../i18n/src/locales';
import { MetricUI } from './MetricUI';

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
    metric,
    setMetric,
  } = useTrackScreen();

  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <>
      <Container>
        <UIWrapper bottomTabHeight={bottomTabHeight}>
          <InfoContainer>
            <Ionicons name="md-locate" size={150} color={Colors.primary} />
            <InfoText>{translate('trackScreenTitle')}</InfoText>
            <SmallInfoText>{translate('trackScreenInfo')}</SmallInfoText>
          </InfoContainer>
          <MetricUI
            setDistance={setDistance}
            setMetric={setMetric}
            metric={metric}
          />
          <ScreenText>
            {translate('distance')}: {distance.toFixed(0)}
            {metric === 'km' ? 'km' : 'm'}
          </ScreenText>
          <Slider
            style={{ width: 200, height: 40, marginVertical: 20 }}
            minimumValue={metric === 'm' ? 100 : 1}
            maximumValue={metric === 'm' ? 1000 : 160}
            step={metric === 'm' ? 100 : 1}
            thumbTintColor={Colors.primary}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor={Colors.accent}
            onValueChange={value => setDistance(value)}
            value={distance}
          />
          <TouchableInterface onPress={() => setIsVisible(true)}>
            <TrackButtonContainer>
              <Ionicons
                name="md-location-outline"
                size={25}
                color={Colors.accent}
              />
              <TrackButtonText>{translate('track')}</TrackButtonText>
            </TrackButtonContainer>
          </TouchableInterface>
        </UIWrapper>
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
        metric={metric}
      />
    </>
  );
};
