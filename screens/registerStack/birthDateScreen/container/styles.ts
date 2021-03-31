import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants/dimensions';

export const BirthDateInput = styled(TextInputMask)`
  text-align: center;
  font-size: ${SCREEN_WIDTH * 0.09}px;
  color: white;
`;

export const StyledText = styled.Text`
  font-family: tegomin;
  color: white;
  font-size: ${SCREEN_WIDTH * 0.1}px;
  margin-top: ${SCREEN_HEIGHT * 0.1}px;
  text-align: center;
`;
