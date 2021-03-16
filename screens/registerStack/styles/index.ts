import styled from 'styled-components/native';
import Colors from '../../../constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants/dimensions';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: space-around;
  align-items: center;
`;

export const StyledText = styled.Text`
  font-family: matrix;
  color: white;
  font-size: ${SCREEN_WIDTH * 0.1}px;
  margin-top: ${SCREEN_HEIGHT * 0.1}px;
`;

export const ButtonContainer = styled.View``;
