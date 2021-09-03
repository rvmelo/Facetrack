import { Dimensions, TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/dimensions';

// constants
import { fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';

interface ListItemContainerProps {
  headerHeight: number;
}

const cardOrigin = {
  x:
    Dimensions.get('window').width / 2 -
    (Dimensions.get('window').width * 0.9) / 2,
  y:
    Dimensions.get('window').height / 2 -
    (Dimensions.get('window').height * 0.8) / 2,
};

export const ActivityIndicatorContainer = styled.View`
  background-color: ${Colors.background};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//  Users List
export const UsersListContainer = styled.View`
  background-color: ${Colors.background};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RateScreenText = styled.Text`
  font-size: ${fonts.sizes.lg}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
  text-align: center;
  margin-bottom: 20px;
`;

export const TouchableButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ButtonText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  margin-left: 5px;
`;

export const ButtonLayout = styled.View`
  background: ${Colors.primary};
  flex-direction: row;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 40px;
  overflow: hidden;
`;

//  list item
export const ListItemContainer = styled.View<ListItemContainerProps>`
  height: ${props => SCREEN_HEIGHT - props.headerHeight}px;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 50px;
`;

export const ItemText = styled.Text`
  font-size: ${fonts.sizes.xl}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
  text-align: center;
`;

export const CardContainer = styled(Animated.View)`
  position: absolute;
  width: 90%;
  height: 60%;
  overflow: hidden;
  left: ${cardOrigin.x}px;
  top: ${cardOrigin.y}px;
  border-radius: 5px;
  opacity: 1;
  z-index: 2;
`;

export const ItemTextContainer = styled(Animated.View)`
  position: absolute;
  width: 90%;
  height: 60%;
  left: ${cardOrigin.x}px;
  top: ${cardOrigin.y}px;
  justify-content: center;
`;

export const StyledImage = styled.ImageBackground`
  flex: 1;
`;

export const ButtonPanelContainer = styled.View`
  width: 80%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const BackButton = styled.TouchableOpacity.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const TouchableIcon = styled.TouchableWithoutFeedback``;
