import { Dimensions, TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
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

export const ItemTextContainer = styled.View`
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
