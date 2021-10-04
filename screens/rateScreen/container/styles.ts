import { Dimensions, TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/dimensions';

// constants
import { fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';

interface ContainerProps {
  bottomTabHeight: number;
}

const cardOrigin = {
  x:
    Dimensions.get('window').width / 2 -
    (Dimensions.get('window').width * 0.9) / 2,
  y:
    Dimensions.get('window').height / 2 -
    (Dimensions.get('window').height * 0.6) / 2,
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
export const ListItemContainer = styled.View<ContainerProps>`
  height: ${props => SCREEN_HEIGHT - props.bottomTabHeight}px;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
`;

export const ItemTextContainer = styled(Animated.View)<ContainerProps>`
  position: absolute;
  width: 90%;
  height: 60%;
  left: ${cardOrigin.x}px;
  top: ${props => cardOrigin.y - props.bottomTabHeight}px;
  justify-content: center;
`;

export const ItemText = styled.Text`
  font-size: ${fonts.sizes.xl}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
  text-align: center;
`;

export const CardContainer = styled(Animated.View)<ContainerProps>`
  position: absolute;
  width: 90%;
  height: 60%;
  overflow: hidden;
  left: ${cardOrigin.x}px;
  top: ${props => cardOrigin.y - props.bottomTabHeight}px;
  border-radius: 5px;
  opacity: 1;
  z-index: 2;
`;

export const TouchableCard = styled.TouchableWithoutFeedback``;

export const CardBottom = styled.View`
  background-color: white;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

export const CardBottomText = styled.Text`
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  color: ${Colors.primary};
`;

export const StyledImage = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  padding: 0 20px 20px 20px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RowDataContainer = styled.View``;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageText = styled.Text`
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  color: ${Colors.accent};
  margin-left: 5px;
`;

export const ButtonPanelContainer = styled.View<ContainerProps>`
  width: 80%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  position: absolute;
  left: auto;
  right: auto;
  top: ${props =>
    (SCREEN_HEIGHT - props.bottomTabHeight) * 0.57 + cardOrigin.y}px;
  z-index: 5;
`;

export const TouchableIcon = styled.TouchableWithoutFeedback``;

export const IconButtonContainer = styled.View`
  flex-direction: row;
`;

// Icon button
export const StyledIconButton = styled.View`
  height: 30px;
  width: 30px;
  margin-left: 10px;
  border-radius: 5px;
  border-color: ${Colors.accent};
  border-width: 2px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
