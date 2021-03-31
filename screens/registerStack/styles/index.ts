import styled from 'styled-components/native';
import Colors from '../../../constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants/dimensions';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
`;

export const StyledText = styled.Text`
  font-family: tegomin;
  color: white;
  font-size: ${SCREEN_WIDTH * 0.1}px;
  margin-top: ${SCREEN_HEIGHT * 0.1}px;
  text-align: left;
`;

export const TopContainer = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  margin-left: 20px;
`;

export const ButtonContainer = styled.View``;
