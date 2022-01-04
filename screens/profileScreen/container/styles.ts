import styled from 'styled-components/native';

import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../constants/dimensions';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const ProfileDataContainer = styled.View`
  padding: 20px 20px 0;
`;

export const StyledText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const TouchableInterface = styled.TouchableWithoutFeedback``;

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

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.background};
`;

//  profile scroll
export const EmptyPhotoContainer = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.background};
`;

export const PhotoContainerText = styled.Text`
  font-size: ${fonts.sizes.lg}px;
  font-family: ${fonts.family};
  text-align: center;
  color: ${Colors.accent};
`;

export const FlatListContainer = styled.View`
  width: ${SCREEN_WIDTH}px;
`;
