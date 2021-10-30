import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';

import Colors from '../../constants/colors';
import { fonts } from '../../constants/fonts';

//  constants
import { SCREEN_WIDTH } from '../../constants/dimensions';

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

export const EmptyPhotoContainer = styled.View`
  flex: 1;
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

// profile button
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

//  button panel
export const ButtonPanelContainer = styled.View`
  width: 80%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const TouchableIcon = styled.TouchableWithoutFeedback``;

// rate modal
export const CenteredView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 22px;
  background: rgba(0, 0, 0, 0.9);
`;

export const RateModalText = styled.Text`
  color: ${Colors.background};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.sm}px;
`;

export const InputContainer = styled.View`
  border-color: ${Colors.primary};
  border-width: 2px;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0;
  width: 250px;
`;

export const RateModalInput = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 10,
  textAlignVertical: 'top',
  placeholder: 'Leave a message (optional)',
  selectionColor: Colors.primary,
})``;

//  modal button

export const ModalUserInfoContainer = styled.View`
  margin-bottom: 10px;
  align-items: center;
`;

export const StyledModalButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const ModalButtonLayout = styled.View`
  background: ${Colors.primary};
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 200px;
`;

export const ModalText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.sm}px;
  text-align: left;
`;

//  media modal
export const Instagram = styled.Text`
  color: ${Colors.accent};
  font-weight: bold;
`;

export const ModalDate = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.sm}px;
  text-align: center;
  margin-top: 5px;
`;

export const ModalTextContainer = styled.View`
  margin: 20px 5px 0;
  padding: 5px;
  border-radius: 5px;
  background: #404040;
`;

interface ModalBackgroundProps {
  bottomTabHeight: number;
}

export const ModalBackground = styled.View<ModalBackgroundProps>`
  flex: 1;
  background: rgba(0, 0, 0, 0.9);
  padding-bottom: ${props => props.bottomTabHeight}px;
`;

export const ModalContent = styled.View`
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const MediaContainer = styled.View`
  align-items: center;
`;

interface ModalPhotoProps {
  imgHeight: number;
}

export const ModalPhoto = styled.Image<ModalPhotoProps>`
  width: ${SCREEN_WIDTH}px;
  height: ${props => props.imgHeight}px;
`;

//  close button
export const CloseButtonLayout = styled.View`
  /* margin: 5px 0; */
  border-radius: 25px;
  height: 50px;
  width: 50px;
  background: ${Colors.accent};
  border-color: ${Colors.disabled};
  border-width: 2px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

//  header
export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const HeaderInfoContainer = styled.View`
  margin-left: 10px;
`;

export const HeaderText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-weight: bold;
  color: ${Colors.accent};
`;

export const StyledText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

//  selection bar
export const BarContainer = styled.View`
  height: 50px;
  margin: 10px 0 20px;
  flex-direction: row;
  border-color: ${Colors.accent};
  width: 100%;
`;

interface BarItemProps {
  isSelected: boolean;
}

export const BarItem = styled.View<BarItemProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-bottom-width: 2px;
  border-color: ${props => (props.isSelected ? Colors.primary : 'transparent')};
`;

// evaluation List

export const EvaluationContainer = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
`;
