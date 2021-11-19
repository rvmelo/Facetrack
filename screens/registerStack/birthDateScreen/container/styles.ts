import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { SCREEN_HEIGHT } from '../../../../constants/dimensions';
import { fonts } from '../../../../constants/fonts';

export const BirthDateInput = styled(TextInputMask)`
  text-align: center;
  font-size: ${fonts.sizes.xl}px;
  color: white;
`;

export const StyledText = styled.Text`
  font-family: tegomin;
  color: white;
  font-size: ${fonts.sizes.xl}px;
  margin-top: ${SCREEN_HEIGHT * 0.1}px;
  text-align: center;
`;
