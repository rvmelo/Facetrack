import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { SCREEN_WIDTH } from '../../../../constants/dimensions';

export const BirthDateInput = styled(TextInputMask)`
  text-align: center;
  font-size: ${SCREEN_WIDTH * 0.09}px;
  color: white;
`;
