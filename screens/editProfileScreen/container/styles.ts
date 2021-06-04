import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';

//  constants
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../constants/dimensions';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: 20,
  },
})`
  background-color: ${Colors.background};
`;

export const AvatarContainer = styled.View`
  border-radius: 10px;
  border-color: ${Colors.primary};
  border-width: 2px;
  width: ${SCREEN_WIDTH / 3}px;
  height: ${SCREEN_WIDTH / 3}150px;

  overflow: hidden;

  align-items: center;
  justify-content: center;
`;

export const TouchableInterface = styled.TouchableWithoutFeedback``;

export const AvatarImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 100%;
  width: 100%;
`;

export const TouchableButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

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

export const InstagramButtonLayout = styled.View`
  background: ${Colors.primary};
  flex-direction: row;
  padding: 10px;
  margin-top: ${SCREEN_WIDTH / 3.5}px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 50px;
  overflow: hidden;
`;

export const ButtonText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  margin-left: 5px;
`;

export const SectionText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.lg}px;
  text-align: center;
`;

export const PickerContainer = styled.View`
  border-width: 2px;
  border-color: ${Colors.primary};
  border-radius: 5px;
  margin: 20px 0;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;
