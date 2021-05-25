import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../constants/dimensions';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const ProfileDataContainer = styled.View`
  padding: 20px;
`;

export const StyledName = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-weight: bold;
  color: ${Colors.accent};
  margin-top: 10px;
`;

export const StyledText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const TouchableInterface = styled.TouchableWithoutFeedback``;

export const StyledEditButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const EditButtonLayout = styled.View`
  background: ${Colors.primary};
  margin: 10px 0;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const ButtonText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
`;

// photo section

export const UserPhoto = styled.Image.attrs(({ source }) => {
  source;
})`
  width: ${SCREEN_WIDTH / 3}px;
  height: ${SCREEN_WIDTH / 3}px;
  margin: 1px;
`;

export const VideoContainer = styled.View`
  width: ${SCREEN_WIDTH / 3}px;
  height: ${SCREEN_WIDTH / 3}px;
  margin: 1px;
`;

export const EmptyPhotoContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 100px;
  background-color: ${Colors.background};
`;

export const PhotoContainerText = styled.Text`
  font-size: ${fonts.sizes.lg}px;
  font-family: ${fonts.family};
  text-align: center;
  color: ${Colors.accent};
`;
