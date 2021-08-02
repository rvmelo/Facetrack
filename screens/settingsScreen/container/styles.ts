import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';

//  constants
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

interface DeleteButtonLayoutProps {
  primaryColor?: string;
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: 120,
  },
})`
  background-color: ${Colors.background};
`;

export const TouchableButton = styled.TouchableNativeFeedback.attrs({
  background: TouchableNativeFeedback.Ripple('#ccc', true),
  useForeground: true,
})``;

export const DeleteButtonLayout = styled.View<DeleteButtonLayoutProps>`
  background: ${props =>
    props.primaryColor ? props.primaryColor : 'transparent'};
  flex-direction: row;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 350px;
  overflow: hidden;
`;

export const ButtonText = styled.Text`
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
  margin-left: 5px;
`;
