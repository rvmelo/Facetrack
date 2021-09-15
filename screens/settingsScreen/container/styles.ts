import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';

//  constants
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

interface DeleteButtonLayoutProps {
  primaryColor?: string;
}

// export const Container = styled.ScrollView.attrs({
//   contentContainerStyle: {
//     alignItems: 'center',
//     paddingTop: 120,
//   },
// })`
//   background-color: ${Colors.background};
// `;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 120px 0 20px 0;
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

export const ItemContainer = styled.View`
  flex-direction: row;
  width: 350px;
`;

export const ItemsContainer = styled.View``;

export const ItemText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
  margin-left: 5px;
`;
