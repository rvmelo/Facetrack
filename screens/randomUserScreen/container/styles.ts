import styled from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';

import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

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

//  button panel
export const ButtonPanelContainer = styled.View`
  width: 80%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const TouchableIcon = styled.TouchableWithoutFeedback``;

// modal
export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

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

export const ButtonText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
`;

export const ModalText = styled.Text`
  color: ${Colors.background};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
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
