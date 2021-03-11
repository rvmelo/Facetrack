import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import Colors from '../../../../constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../constants/dimensions';

interface StyledTextProps {
  fontSize?: number;
}

export const StyledScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 100,
    alignItems: 'center',
  },
})`
  background-color: ${Colors.background};
`;

export const ImageContainer = styled.View`
  width: ${0.5 * SCREEN_WIDTH}px;
  height: ${0.5 * SCREEN_WIDTH}px;
  border-width: 2px;
  border-color: ${Colors.text};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const StyledText = styled.Text<StyledTextProps>`
  font-family: matrix;
  color: white;
  font-size: ${props => (props.fontSize ? props.fontSize : 30)}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const GenderContainer = styled.View`
  align-items: center;
  margin: 20px 0;
`;

export const PickerContainer = styled.View`
  background-color: ${Colors.disabled};
  border-radius: 10px;
  padding: 0 20px;
  justify-content: space-around;
  height: ${0.3 * SCREEN_HEIGHT}px;
  margin-bottom: 20px;
`;

// Gender Button

export const StyledButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ButtonLayout = styled.View`
  background: ${Colors.primary};
  width: ${0.4 * SCREEN_WIDTH}px;
  height: ${0.1 * SCREEN_WIDTH}px;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-family: matrix;
  font-size: ${0.05 * SCREEN_WIDTH}px;
`;
