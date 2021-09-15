import styled from 'styled-components/native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  align-items: center;
  justify-content: center;
`;

export const ScreenText = styled.Text`
  font-size: ${fonts.sizes.lg}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;
